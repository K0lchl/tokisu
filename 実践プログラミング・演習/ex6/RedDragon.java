public class RedDragon extends BreathDragon {
    RedDragon(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
    }

    @Override
    public int breathe() {
        System.out.println(this.name + "はしゃくねつの炎を吐いた！");
        int damage = this.strength;
        return damage;
    }
}