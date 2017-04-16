package haxparseri;

import java.io.BufferedReader;

public final class HakusanaParser extends Parser {

    private final Selitys selitys;
    private String hakusana = "";

    public HakusanaParser(Selitys selitys, BufferedReader rd, MainParser main) {
        super(rd, main);
        this.selitys = selitys;
    }

    @Override
    protected void processTag(String tag) {
    }

    @Override
    protected void process(char next) {
        hakusana += next;
    }

    @Override
    protected void onReturn() {
        super.onReturn();
        main.addHakusana(new Hakusana(hakusana, selitys.getId()));
    }
}
