import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Human hero = new Human("勇者", 18, 151, 63, 44);
        Dragon dragon = new Dragon("ドラゴン", 30, 246, 88, 45);

        System.out.println(dragon.getName() + " が現れた！");
        hero.printStatus();
        dragon.printStatus();

        Scanner stdIn = new Scanner(System.in);
        int damage;
        int turn = 1;

        Battle: do {
            System.out.println(turn + " ターン目：");
            System.out.print("[1] 連続攻撃 [2] 回復 [3] 逃げる : ");
            final int command = stdIn.nextInt();

            switch (command) {
                case 1:
                    damage = dragon.attack(hero.getName(), hero.getToughness());
                    hero.damaged(damage);
                    hero.printStatus();
                    if (hero.isDefeated())
                        return;

                    hero.consecutiveAttack(dragon);
                    if (dragon.isDefeated())
                        break Battle;
                    break;
                case 2:
                    hero.heal(50);
                    dragon.roar();
                    break;
                case 3:
                    hero.escape();
                    break Battle;
                default:
                    System.out.println("1-3 のいずれかを入力してください。");
                    continue;
            }

            ++turn;
        } while (turn <= 10);

        stdIn.close();
    }
}