package haxparseri;

public abstract class IdObject implements Comparable<IdObject> {

    private final int id;

    protected IdObject(int id) {
        this.id = id;
    }

    @Override
    public final int compareTo(IdObject o) {
        return this.id - o.id;
    }

    public final int getId() {
        return id;
    }
}
