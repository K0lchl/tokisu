public class Main {
    public static void main(String[] args) {
        // オリジナルモンスター（ゴースト）の生成
        Ghost ghost = new Ghost("テレサ👻", 15, 120, 40, 10);

        System.out.println(ghost.getName() + "が現れた！");
        ghost.printStatus();

        // 勇者のステータスと装備
        Human hero = new Human("勇者", 22, 183, 75, 52);
        hero.printStatus();

        Sword sword = new Sword("黄金の剣", 100);
        hero.equip(sword);

        // 勇者の攻撃（1/2の確率ですり抜ける）
        System.out.println("--- 勇者の攻撃！ ---");
        int damage = hero.swordAttack(ghost.getName(), ghost.getToughness());
        ghost.damaged(damage);
        ghost.printStatus();
    }
}