package haxparseri;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

public final class MainParser {

    private final FileReader fr;
    private final BufferedReader rd;
    private final Map<Integer, Selitys> selitykset = new HashMap<>();
    private final Map<String, Hakusana> hakusanat = new HashMap<>();
    private final List<Linkki> linkit = new ArrayList<>();
    private final Stack<Parser> previousParsers = new Stack<>();
    private Parser currentParser;

    public MainParser() throws FileNotFoundException {
        fr = new FileReader("parsettava.xml");
        rd = new BufferedReader(fr);
        currentParser = new TopParser(rd, this);
    }

    public void addHakusana(Hakusana hs) {
        System.out.println("Taulussa " + hs.getSana());
        hakusanat.put(hs.getSana(), hs);
    }

    public void addSelitys(Selitys s) {
        selitykset.put(s.getId(), s);
    }

    public void linkita(Linkki linkki) {
        linkit.add(linkki);
    }

    public void push(Parser parser) {
        //System.out.println("From " + currentParser + " to " + parser);
        previousParsers.push(currentParser);
        currentParser = parser;
    }

    public void restore() {
        /*if (previousParsers.isEmpty()) {
         System.out.println("Empty");
         }*/
        Parser to = previousParsers.pop();
        //System.out.println("Return from " + currentParser + " to " + to);
        currentParser = to;
    }

    public void run() throws FileNotFoundException, IOException {
        while (rd.ready()) {
            currentParser.parse();
        }
        rd.close();
        fr.close();

        Collections.sort(linkit);
        List<Hakusana> hakusanatJarjestyksesa = new ArrayList<>(hakusanat.values());
        Collections.sort(hakusanatJarjestyksesa);
        List<Selitys> selityksetJarjestyksesa = new ArrayList<>(selitykset.values());
        Collections.sort(selityksetJarjestyksesa);
        StringBuilder sb = new StringBuilder(750000);

        sb.append("INSERT INTO tekijat (nimi) VALUES ('Seppo A. Teinonen');\n");

        sb.append("INSERT INTO selitykset (selitys, tekija) VALUES \n");
        for (int i = 0; i < selityksetJarjestyksesa.size(); i++) {
            Selitys s = selityksetJarjestyksesa.get(i);
            sb.append("('")
                    .append(s.getSelitys())
                    .append("','1')");
            if (i != selitykset.size() - 1) {
                sb.append(",\n");
            }
        }
        sb.append(";\n");

        sb.append("INSERT INTO hakusanat (hakusana, selitys) VALUES");
        for (int i = 0; i < hakusanatJarjestyksesa.size(); i++) {
            Hakusana hs = hakusanatJarjestyksesa.get(i);
            sb.append("('")
                    .append(hs.getSana())
                    .append("',")
                    .append(hs.getViitattu())
                    .append(")");
            if (i != hakusanatJarjestyksesa.size() - 1) {
                sb.append(",\n");
            }
        }
        sb.append(";\n");

        sb.append("INSERT INTO linkit (linkkisana, selitys, hakusana) VALUES");
        for (int i = 0; i < linkit.size(); i++) {
            Linkki l = linkit.get(i);
            //System.out.println("Haetaan " + l.getSanaan());
            Hakusana hakusana = hakusanat.get(l.getSanaan());
            if (hakusana == null) {
                hakusana = hakusanat.get(l.getSanaan().toLowerCase());
            }
            if (hakusana == null) {
                continue;
            }
            int sanaan = hakusana.getId();
            if (sanaan == hakusana.getViitattu()) {
                continue;
            }
            sb.append("('")
                    .append(l.getKorvattava())
                    .append("',")
                    .append(l.getAlkupera())
                    .append(",")
                    .append(sanaan)
                    .append(")");
            if (i != linkit.size() - 1) {
                sb.append(",\n");
            }
        }
        sb.append(";\n");

        try (FileWriter fw = new FileWriter("sanat.sql")) {
            fw.append(sb);
        }
        System.out.println(hakusanat.size());
    }
}
