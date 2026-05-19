public class BattleUtils {
    public static boolean attack(Human human, MetalDragon dragon) {
        int damage = human.attack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus();
        return dragon.isDefeated();
    }

    public static boolean attack(MetalDragon dragon, Human human) {
        int damage = dragon.attack(human.getName(), human.getToughness());
        human.damaged(damage);
        human.printStatus();
        return human.isDefeated();
    }

    public static boolean swordAttack(Human human, MetalDragon dragon) {
        int damage = human.swordAttack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus();
        return dragon.isDefeated();
    }
}