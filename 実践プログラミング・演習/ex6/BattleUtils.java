public class BattleUtils {
    public static boolean attack(Creature subject, Creature target) {
        int damage = subject.attack(target.getName(), target.getToughness());
        target.damaged(damage);
        target.printStatus();
        return target.isDefeated();
    }

    public static boolean swordAttack(Human human, Creature target) {
        int damage = human.swordAttack(target.getName(), target.getToughness());
        target.damaged(damage);
        target.printStatus();
        return target.isDefeated();
    }
}