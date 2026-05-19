public class Human {
    private String name;
    private int level;
    private int hp;
    private int strength;
    private int toughness;

    private Sword sword;

    Human(String name, int level, int hp, int strength, int toughness) {
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
        System.out.println(this.name + " は " + targetName + " に攻撃した！");
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

    void guard() {
        System.out.println(this.name + " は身を守っている。");
    }

    void escape() {
        System.out.println(this.name + " は逃げ出した！");
    }

    void heal(int amount) {
        this.hp += amount;
        if (this.hp > 151) {
            this.hp = 151;
        }
        System.out.println(this.name + "は回復魔法を唱えた。HP が " + amount + "回復した。 ");
        this.printStatus();
    }

    int swordAttack(String targetName, int targetToughness) {
        if (this.sword == null) {
            return this.attack(targetName, targetToughness);
        }

        System.out.println(this.name + " は " + this.sword.getName() + " で " +
                targetName + " に攻撃した！");
        int damage = (this.strength + this.sword.getPower()) - targetToughness;
        return damage;
    }

    void consecutiveAttack(Dragon dragon) {
        int count = (Math.random() < 0.5) ? 2 : 3;
        System.out.println(this.name + " は連続攻撃をした！（" + count + "回連続攻撃）");

        for (int i = 1; i <= count; i++) {
            System.out.println("--- " + i + "回目 ---");
            int damage = this.swordAttack(dragon.getName(), dragon.getToughness());
            dragon.damaged(damage);
            dragon.printStatus();
            if (dragon.isDefeated()) {
                break;
            }
        }
    }
}