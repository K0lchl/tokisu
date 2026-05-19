public class ex5_2 {
    public static void main(String[] args) {
        // 勇者のステータス
        Human hero = new Human("勇者", 20, 167, 69, 48);
        // メタルドラゴンのステータス
        MetalDragon[] dragons = new MetalDragon[2];
        dragons[0] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);
        dragons[1] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);

        for (MetalDragon dragon : dragons) {
            System.out.println(dragon.getName() + "が現れた！");
        }

        hero.printStatus();
        for (MetalDragon dragon : dragons) {
            dragon.printStatus();
        }

        BattleUtils.attack(hero, dragons[0]); // 勇者がメタルドラゴン1号に攻撃
        BattleUtils.attack(dragons[0], hero); // メタルドラゴン1号が勇者に攻撃
        BattleUtils.attack(dragons[1], hero); // メタルドラゴン2号が勇者に攻撃
    }
}