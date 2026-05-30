public class Human extends Creature {
    private Sword sword; // 装備しているSwordオブジェクト

    Human(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
    }

    public void guard() {
        System.out.println(this.name + "は身を守っている。");
    }

    public void escape() {
        System.out.println(this.name + "は逃げ出した！");
    }

    public void equip(Sword sword) {
        this.sword = sword;
        System.out.print(this.name + "は" + sword.getName() + "を装備した。");
        System.out.println("攻撃力が" + (this.strength + sword.getPower()) +
                "になった！");
    }

    public void printEquipment() {
        if (this.sword != null) {
            System.out.println(this.name + "の装備: {" + this.sword.getName() + ", 攻撃力: " +
                    (this.getStrength() + this.sword.getPower()) + "}");
        } else {
            System.out.println(this.name + "の装備: {なし, 攻撃力: " +
                    this.getStrength() + "}");
        }
    }

    public int swordAttack(String targetName, int targetToughness) {
        if (this.sword == null) {
            return this.attack(targetName, targetToughness);
        }
        System.out.println(this.name + "は" + this.sword.getName() + "で" +
                targetName + "に攻撃した！");
        int damage = (this.strength + this.sword.getPower()) - targetToughness;
        return damage;
    }
}
