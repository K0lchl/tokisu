public class MetalDragon {
    public static int counter = 0; // これまでに生成されたインスタンスの数

    public static void setCounter(int counter) {
        MetalDragon.counter = counter;
    }

    private String name;
    private int level;
    private int hp;
    private int strength;
    private int toughness;

    private int id; // 識別子

    MetalDragon(String name, int level, int hp, int strength, int toughness) {
        this.id = ++counter;
        this.name = name + this.id + "号";
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
        System.out.println(this.name + "は鋼の尻尾を" + targetName +
                           "に叩きつけた！");
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
        System.out.println(this.name + "は力尽きた．．．");
        return true;
    }

    public void roar() {
        System.out.println(this.name + "は雄叫びをあげた！");
    }
}