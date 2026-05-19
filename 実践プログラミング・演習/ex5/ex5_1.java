public class ex5_1 {
    public static void main(String[] args) {
        // メタルドラゴンのステータス
        MetalDragon[] dragons = new MetalDragon[3];
        dragons[0] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);
        dragons[1] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);

        MetalDragon.setCounter(4);
        dragons[2] = new MetalDragon("メタルドラゴン", 30, 198, 98, 62);

        for (MetalDragon dragon : dragons) {
            System.out.println(dragon.getName() + "が現れた！");
        }

        for (MetalDragon dragon : dragons) {
            dragon.printStatus();
        }
    }
}
