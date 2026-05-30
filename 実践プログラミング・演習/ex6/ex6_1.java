public class ex6_1 {
    public static void main(String[] args) {
        // 勇者のステータス
        Human hero = new Human("勇者", 21, 183, 75, 52);

        // ドラゴン、メタルドラゴンのステータス
        Dragon[] dragons = new Dragon[3];
        MetalDragon.setCounter(7);
        dragons[0] = new Dragon("ドラゴン", 30, 246, 88, 45);
        dragons[1] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);
        dragons[2] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);

        for (Dragon dragon : dragons) {
            System.out.println(dragon.getName() + "が現れた！");
        }
        hero.printStatus();
        for (Dragon dragon : dragons) {
            dragon.printStatus();
        }
    }
}