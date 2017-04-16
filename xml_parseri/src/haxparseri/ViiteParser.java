package haxparseri;

import java.io.BufferedReader;

public final class ViiteParser extends Parser {

    private final Parser previous;
    private final Selitys selitys;

    public ViiteParser(Selitys sana, Parser previous, BufferedReader rd, MainParser main) {
        super(rd, main);
        this.previous = previous;
        this.selitys = sana;
    }

    @Override
    protected void processTag(String tag) {
        if (tag.startsWith("A href=")) {
            main.push(new LinkkiParser(this, selitys, tag, rd, main));
        } else if ("Nuoli".equals(tag)) {
            main.push(new NuoliParser(selitys, rd, main));
        } else if ("Viite".equals(tag)) {
            main.push(new ViiteParser(selitys, previous, rd, main));
        }
    }

    @Override
    protected void process(char next) {
        previous.process(next);
    }
}
