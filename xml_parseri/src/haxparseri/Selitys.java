package haxparseri;

public final class Selitys extends IdObject {

    private static int ids = 1;
    private String selitys = "";

    public Selitys() {
        super(ids++);
    }

    public void appendSelitys(char merkki) {
        if (selitys.isEmpty() && isIgnoreCharacter(merkki)) {
            return;
        }
        selitys += merkki;
    }

    public String getSelitys() {
        return selitys.trim();
    }

    private static boolean isIgnoreCharacter(char merkki) {
        return merkki == '\n' || merkki == ' ' || merkki == '\u0009';
    }
}
