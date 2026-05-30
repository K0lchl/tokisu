public class BreathDragon extends Dragon {
    BreathDragon(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
    }

    public int breathe() {
        System.out.println(this.name + "は息を吐いた！");
        int damage = this.strength;
        return damage;
    }
}
