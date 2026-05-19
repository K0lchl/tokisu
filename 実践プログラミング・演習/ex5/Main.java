import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Human hero = new Human("勇者", 20, 167, 69, 48);

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

        final int TURN_MAX = 3; // ターン数の上限
        Scanner stdIn = new Scanner(System.in);
        int equip_swordno = -1;

        hero.printEquipment();

        Battle:
        for (int turn = 1;; ) {
            System.out.println(turn + "ターン目：");
            System.out.print("[1] 攻撃 [2] 装備 [3] 逃げる ：");
            final int command = stdIn.nextInt();
            switch (command) {
                case 1:
                    ++turn;
                    if (BattleUtils.swordAttack(hero, dragons[0])) {
                        break Battle;
                    }
                    if (BattleUtils.attack(dragons[0], hero)) {
                        return;
                    }
                    break;
                case 2:
                    if (++equip_swordno >= swords.length) {
                        equip_swordno = 0;
                    }
                    hero.equip(swords[equip_swordno]);
                    continue;
                case 3:
                    hero.escape();
                    return; // モンスターを殲滅せずに終了
                default:
                    System.out.println("1-3 のいずれかを入力してください。");
                    continue;
            }
            if (turn > TURN_MAX) {
                System.out.println("ターン数が上限に達しました。");
                return;
            } else {
                System.out.println("あと " + (TURN_MAX - turn + 1) + " ターンです。");
            }
        }
        System.out.println("モンスターを殲滅した！");

        stdIn.close();
    }
}
