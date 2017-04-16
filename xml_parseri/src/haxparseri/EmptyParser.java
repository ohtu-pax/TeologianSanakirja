package haxparseri;

import java.io.BufferedReader;

public final class EmptyParser extends Parser {

    private final Parser previous;

    public EmptyParser(Parser previous, BufferedReader rd, MainParser main) {
        super(rd, main);
        this.previous = previous;
    }

    @Override
    protected void processTag(String tag) {
        main.push(new EmptyParser(this, rd, main));
    }

    @Override
    protected void process(char next) {
        previous.process(next);
    }
}
