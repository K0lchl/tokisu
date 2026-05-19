public class ex5_3 {
    public static void main(String[] args) {
        // 勇者のステータス
        Human hero = new Human("勇者", 20, 167, 69, 48);

        // メタルドラゴンのステータス
        MetalDragon[] dragons = new MetalDragon[1];
        dragons[0] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);
        for (MetalDragon dragon : dragons) {
            System.out.println(dragon.getName() + "が現れた！");
        }

        hero.printStatus();
        for (MetalDragon dragon : dragons) {
            dragon.printStatus();
        }

        // 複数の剣オブジェクトを生成
        Sword[] swords = new Sword[3];
        swords[0] = new Sword();
        swords[1] = new Sword("黄金の剣", 100);
        swords[2] = new Sword("光の剣", 120);
        for (int i = 0; i < swords.length; i++) {
            System.out.println("swords[" + i + "]: " + swords[i]);
        }

        hero.printEquipment();
        for (int i = 0; i < swords.length; i++) {
            hero.equip(swords[i]);
            BattleUtils.swordAttack(hero, dragons[0]);
        }
    }
}