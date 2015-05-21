package haxparseri;

import java.io.BufferedReader;

public final class LinkkiParser extends Parser {

    private final Linkki linkki;
    private final Parser previous;
    private boolean isDoubled;

    public LinkkiParser(Parser previous, Selitys linkkiSanassa, String tag, BufferedReader rd, MainParser main) {
        super(rd, main);
        this.previous = previous;
        int sulku1 = tag.indexOf('(');
        int sulku2 = tag.lastIndexOf(')');
        String sana = tag.substring(sulku1 + 1, sulku2).trim();
        linkki = new Linkki(sana, linkkiSanassa);
    }

    @Override
    protected void processTag(String tag) {
        isDoubled = true;
        main.push(this);
    }

    @Override
    protected void process(char next) {
        if (!isDoubled) {
            linkki.appendKorvattava(next);
        }
        previous.process(next);
    }

    @Override
    protected void onReturn() {
        super.onReturn();
        if (!isDoubled) {
            main.linkita(linkki);
        }
    }
}
