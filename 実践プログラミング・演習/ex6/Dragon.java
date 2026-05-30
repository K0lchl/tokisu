public class Dragon extends Creature {
    Dragon(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
    }

    @Override
    public int attack(String targetName, int targetToughness) {
        System.out.println(this.name + "は鋭い爪で" + targetName +
                "を切り裂いた！");
        int damage = this.strength - targetToughness;
        return damage;
    }

    public void roar() {
        System.out.println(this.name + "は雄叫びをあげた！");
    }
}