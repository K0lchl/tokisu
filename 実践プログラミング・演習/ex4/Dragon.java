public class Dragon {
    private String name;
    private int level;
    private int hp;
    private int strength;
    private int toughness;

    Dragon(String name, int level, int hp, int strength, int toughness) {
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.strength = strength;
        this.toughness = toughness;
    }

    String getName() {
        return this.name;
    }

    int getHp() {
        return this.hp;
    }

    int getStrength() {
        return this.strength;
    }

    int getToughness() {
        return this.toughness;
    }

    void printStatus() {
        System.out.println(this.name + " {Lv: " + this.level +
                           ", HP: " + this.hp + ", 力: " + this.strength +
                           ", 守: " + this.toughness + "}");
    }

    int attack(String targetName, int targetToughness) {
        System.out.println(this.name + " は鋭い爪で " + targetName + " を切り裂いた！");
        int damage = this.strength - targetToughness;
        return damage;
    }

    void damaged(int damage) {
        if (damage <= 0) {
            System.out.println(this.name + " はダメージをうけない！");
            return;
        }

        System.out.println(this.name + " は " + damage + " のダメージをうけた！");
        this.hp -= damage;
        this.hp = (this.hp < 0) ? 0 : this.hp;
        return;
    }

    boolean isDefeated() {
        if (this.hp > 0) {
            return false;
        }

        System.out.println(this.name + " は力尽きた...");
        return true;
    }

    void roar() {
        System.out.println(this.name + " は雄叫びをあげた！");
    }
}