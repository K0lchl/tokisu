public class MetalDragon extends Dragon {
    private static int counter = 0; // これまでに生成されたインスタンスの数

    public static void setCounter(int counter) {
        MetalDragon.counter = counter;
    }

    private int id; // 識別ID

    MetalDragon(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
        this.id = ++counter;
        this.name = name + this.id + "号";
    }

    @Override
    public int attack(String targetName, int targetToughness) {
        System.out.println(this.name + "は鋼の尻尾を" + targetName +
                "に叩きつけた！");
        int damage = this.strength - targetToughness;
        return damage;
    }
}
