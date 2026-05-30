public class Creature {
    protected String name;
    protected int level;
    protected int hp;
    protected int strength;
    protected int toughness;

    Creature() {
    }

    Creature(String name, int level, int hp, int strength, int toughness) {
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.strength = strength;
        this.toughness = toughness;
    }

    public String getName() {
        return this.name;
    }

    public int getHp() {
        return this.hp;
    }

    public int getStrength() {
        return this.strength;
    }

    public int getToughness() {
        return this.toughness;
    }

    public void printStatus() {
        System.out.println(this.name + " {Lv: " + this.level +
                ", HP: " + this.hp + ", 力: " + this.strength +
                ", 守: " + this.toughness + "}");
    }

    public int attack(String targetName, int targetToughness) {
        System.out.println(this.name + "は" + targetName + "に攻撃した！");
        int damage = this.strength - targetToughness;
        return damage;
    }

    public void damaged(int damage) {
        if (damage <= 0) {
            System.out.println(this.name + "はダメージをうけない！");
            return;
        }
        System.out.println(this.name + "は" + damage + "のダメージをうけた！");
        this.hp -= damage;
        this.hp = (this.hp < 0) ? 0 : this.hp;
        return;
    }

    public boolean isDefeated() {
        if (this.hp > 0) {
            return false;
        }
        System.out.println(this.name + "は力尽きた...");
        return true;
    }
}