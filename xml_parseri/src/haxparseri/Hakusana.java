package haxparseri;

public final class Hakusana extends IdObject {

    private static int ids = 1;
    private final String sana;
    private final int viitattu;

    public Hakusana(String sana, int viitattu) {
        super(ids++);
        this.sana = sana.replace("\n", "").replace("" + '\u0009', "").trim();
        /*if (!this.sana.equals(sana)) {
         System.out.println("Muutettu" + sana);
         }*/
        this.viitattu = viitattu;
    }

    public int getViitattu() {
        return viitattu;
    }

    public String getSana() {
        return sana;
    }
}
