public class ex6_3 {
    public static void main(String[] args) {
        // ドラゴンのステータス
        Dragon[] dragons = new Dragon[3];
        dragons[0] = new Dragon("ドラゴン", 30, 246, 88, 45);
        dragons[1] = new RedDragon("レッドドラゴン", 33, 254, 82, 88);
        dragons[2] = new BlueDragon("ブルードラゴン", 32, 245, 71, 77);

        for (Dragon dragon : dragons) {
            System.out.println(dragon.getName() + "が現れた！");
        }
        for (Dragon dragon : dragons) {
            dragon.printStatus();
        }
        for (Dragon dragon : dragons) {
            if (dragon instanceof BreathDragon) {
                ((BreathDragon) dragon).breathe();
            } else {
                dragon.roar();
            }
        }
    }
}