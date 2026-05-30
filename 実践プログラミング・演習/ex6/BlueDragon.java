public class BlueDragon extends BreathDragon {
    BlueDragon(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
    }

    @Override
    public int breathe() {
        System.out.println(this.name + "は凍てつく吹雪を吐いた！");
        int damage = this.strength;
        return damage;
    }
}
