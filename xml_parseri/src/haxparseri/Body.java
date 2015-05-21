package haxparseri;

import java.io.BufferedReader;

public final class Body extends Parser {

    private final Selitys selitys = new Selitys();
    private boolean kirjainLuettu = false;

    public Body(BufferedReader rd, MainParser main) {
        super(rd, main);
    }

    @Override
    protected void processTag(String tag) {
        main.push(getFromTag(tag));
    }

    private Parser getFromTag(String tag) {
        switch (tag) {
            case "Hakusana":
                return new HakusanaParser(selitys, rd, main);
            case "Nuoli":
                return new NuoliParser(selitys, rd, main);
            case "Viite":
                return new ViiteParser(selitys, this, rd, main);
            default:
                if (tag.startsWith("A ID=") && !tag.contains("pgfId") && !tag.contains("href")) {
                    //A ID="relatiivinen"
                    int alku = tag.indexOf('"') + 1;
                    int loppu = tag.lastIndexOf('"');
                    String hakusana = tag.substring(alku, loppu);
                    System.out.println("parsed: "+hakusana);
                    main.addHakusana(new Hakusana(hakusana, selitys.getId()));
                }
                return new EmptyParser(this, rd, main);
        }
    }

    @Override
    protected void process(char next) {
        if (!kirjainLuettu && next != ',' && next != ' ' && next != '\n') {
            kirjainLuettu = true;
        }
        if (kirjainLuettu) {
            selitys.appendSelitys(next);
        }
    }

    @Override
    protected void onReturn() {
        super.onReturn();
        main.addSelitys(selitys);
    }
}
