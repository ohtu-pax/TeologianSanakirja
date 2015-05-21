package haxparseri;

import java.io.BufferedReader;

public final class TopParser extends Parser {

    public TopParser(BufferedReader rd, MainParser main) {
        super(rd, main);
    }

    @Override
    protected void process(char next) {
    }

    @Override
    protected void processTag(String tag) {
        if ("Body".equals(tag)) {
            main.push(new Body(rd, main));
        } else { //"Alku"
            main.push(new EmptyParser(this, rd, main));
        }
    }
}
