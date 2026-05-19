public class ex4_1 {
    public static void main(String[] args) {
        // 勇者のステータス
        Human hero = new Human("勇者", 15, 127, 54, 38);

        // ドラゴンのステータス
        Dragon dragon = new Dragon("ドラゴン", 30, 246, 88, 45);

        System.out.println(dragon.getName() + " が現れた！");
        hero.printStatus();
        dragon.printStatus();

        int damage;
        damage = dragon.attack(hero.getName(), hero.getToughness());
        hero.damaged(damage);
        hero.printStatus();
        if (hero.isDefeated()) {
            return;
        }

        hero.guard();

        damage = hero.attack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus();
        if (dragon.isDefeated()) {
            return;
        }

        damage = dragon.attack(hero.getName(), hero.getToughness());
        hero.damaged(damage);
        hero.printStatus();
        if (hero.isDefeated()) {
            return;
        }

        dragon.roar();

        damage = dragon.attack(hero.getName(), hero.getToughness());
        hero.damaged(damage);
        hero.printStatus();
        if (hero.isDefeated()) {
            return;
        }

        damage = hero.attack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus();
        if (dragon.isDefeated()) {
            return;
        }
    }
}