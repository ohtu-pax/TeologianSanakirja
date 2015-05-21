package haxparseri;

public final class Linkki extends IdObject {

    private static int ids = 1;
    private final String sanaan;
    private final int alkupera;
    private String korvattava;

    public Linkki(String sanaan, Selitys alkupera) {
        super(ids++);
        this.sanaan = sanaan;
        this.alkupera = alkupera.getId();
        korvattava = "";
    }

    public void appendKorvattava(char merkki) {
        korvattava += merkki;
    }

    public String getKorvattava() {
        return korvattava;
    }

    public String getSanaan() {
        return sanaan;
    }

    public int getAlkupera() {
        return alkupera;
    }
}
