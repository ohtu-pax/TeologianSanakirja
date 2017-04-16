package haxparseri;

import java.util.HashMap;
import java.util.Map;

public final class Hakusana extends IdObject {

    private static int ids = 1;
    private final String sana;
    private final int viitattu;
    private static final Map<String, Integer> kaytetytId = new HashMap<>();

    private static int getMyID(String sana) {
        sana = sana.replace("\n", "").replace("" + '\u0009', "").trim();
        if (kaytetytId.containsKey(sana)) {
            return kaytetytId.get(sana);
        }
        int next = ids++;
        kaytetytId.put(sana, next);
        if (ids > 3700) {
            throw new RuntimeException();
        }
        return next;
    }

    public Hakusana(String sana, int viitattu) {
        super(getMyID(sana));
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
