public class Sword {
    private String name;
    private int power;

    Sword() { 
        this("名もなき剣");
    }

    Sword(String name) { 
        this(name, 0);
    }

    Sword(String name, int power) { 
        this.name = name;
        this.power = power;
    }

    public String getName() {
        return this.name;
    }

    public int getPower() {
        return this.power;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String toString() {
        return this.name + "{攻撃力: " + this.power + "}";
    }
}