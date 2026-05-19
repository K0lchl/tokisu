public class ex4_2 {
    public static void main(String[] args) {
        // 勇者のステータス
        Human hero = new Human("勇者", 18, 151, 63, 44);
        // ドラゴンのステータス
        Dragon dragon = new Dragon("ドラゴン", 30, 246, 88, 45);

        System.out.println(dragon.getName() + " が現れた！");
        hero.printStatus(); // 実行例に合わせて調整
        hero.printEquipment();
        dragon.printStatus(); // 実行例に合わせて調整

        int damage;
        damage = hero.swordAttack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus(); 
        if (dragon.isDefeated()) 
            return;

        damage = dragon.attack(hero.getName(), hero.getToughness());
        hero.damaged(damage);
        hero.printStatus();
        if (hero.isDefeated()) 
            return;

        Sword sword = new Sword("スライムの剣", 100);
        System.out.println(sword);
        sword.setName("黄金の剣");
        System.out.println(sword);

        hero.equip(sword);
        System.out.println(sword);

        damage = hero.swordAttack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus();
        if (dragon.isDefeated()) 
            return;

        dragon.roar();

        damage = hero.swordAttack(dragon.getName(), dragon.getToughness());
        dragon.damaged(damage);
        dragon.printStatus();
        if (dragon.isDefeated()) 
            return;
    }
}