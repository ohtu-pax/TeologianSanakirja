package haxparseri;

import java.io.BufferedReader;
import java.io.IOException;

public abstract class Parser {

    protected final BufferedReader rd;
    protected final MainParser main;
    private boolean previousWasTag = false;

    public Parser(BufferedReader rd, MainParser main) {
        this.rd = rd;
        this.main = main;
    }

    public final void parse() throws IOException {
        char next = (char) rd.read();
        if (previousWasTag) {
            if (next == '\n') {
                previousWasTag = false;
                return;
            }
        }
        if (next == '<') {
            previousWasTag = true;
            String tag = readTag();
            if (tag == null) {
                onReturn();
                main.restore();
            } else {
                processTag(tag);
            }
            return;
        }
        process(next);
    }

    protected void onReturn() {
    }

    protected abstract void processTag(String tag);

    protected abstract void process(char next);

    private String readTag() throws IOException {
        String s = "";
        boolean closing = false;
        while (true) {
            char curr = (char) rd.read();
            if (curr == '>') {
                break;
            }
            if (curr == '/') {
                closing = true;
            }
            if (!closing) {
                s += curr;
            }
        }
        return closing ? null : s;
    }
}
