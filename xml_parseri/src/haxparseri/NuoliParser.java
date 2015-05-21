package haxparseri;

import java.io.BufferedReader;

public final class NuoliParser extends Parser {

    private final Selitys selitys;

    public NuoliParser(Selitys selitys, BufferedReader rd, MainParser main) {
        super(rd, main);
        this.selitys = selitys;
    }

    @Override
    protected void process(char next) {
        if (next == '➞') {
            selitys.appendSelitys('➞');
        }
    }

    @Override
    protected void processTag(String tag) {
    }
}
