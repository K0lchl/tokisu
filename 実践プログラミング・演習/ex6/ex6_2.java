public class ex6_2 {
    public static void main(String[] args) {
        // 勇者のステータス
        Human hero = new Human("勇者", 22, 183, 75, 52);

        // メタルドラゴンのステータス
        MetalDragon[] dragons = new MetalDragon[2];
        MetalDragon.setCounter(7);
        dragons[0] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);
        dragons[1] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);

        for (MetalDragon dragon : dragons) {
            System.out.println(dragon.getName() + "が現れた！");
        }
        hero.printStatus();
        hero.printEquipment();
        for (MetalDragon dragon : dragons) {
            dragon.printStatus();
        }

        BattleUtils.attack(hero, dragons[0]);
        BattleUtils.attack(dragons[0], hero);
        BattleUtils.attack(dragons[1], hero);

        Sword sword = new Sword("黄金の剣", 100);
        System.out.println(sword);

        hero.equip(sword);
        hero.printEquipment();

        for (MetalDragon dragon : dragons) {
            BattleUtils.swordAttack(hero, dragon);
        }
    }
}
