import java.util.Random;
import java.util.Scanner;

public class ex3_4 {
    // ステータス表示
    static void printStatus(String name, int level, int hp, int strength, int toughness) {
        System.out.println(name + " {Lv: " + level + ", HP: " + hp +
                           ", 力: " + strength + ", 守: " + toughness + "}");
    }

    // 攻撃処理
    static int attack(String subjectName, int subjectStrength, 
                      String targetName, int targetToughness) {
        System.out.println(subjectName + "は" + targetName + "に攻撃した！");
        int damage = subjectStrength - targetToughness;
        return damage;
    }

    // ダメージ処理
    static int damaged(String name, int hp, int damage) {
        if (damage <= 0) {
            System.out.println(name + "はダメージをうけない！");
            return hp;
        }
        System.out.println(name + "は" + damage + "のダメージをうけた！");
        hp -= damage;
        hp = (hp < 0) ? 0 : hp;
        return hp;
    }

    // 力尽きたか判定（単体用）
    static boolean isDefeated(String name, int hp) {
        if (hp > 0) {
            return false;
        }
        System.out.println(name + "は力尽きた...");
        return true;
    }

    // 【課題3-4 新規】力尽きたか判定（配列用：全滅判定）
    static boolean isDefeated(int[] hps) {
        // (j) 拡張for文で全てのHPをチェック
        for (int hp : hps) {
            if (hp > 0) {
                return false; // 1体でも生存していればfalse
            }
        }
        return true; // 全員0以下ならtrue
    }

    static void guard(String name) {
        System.out.println(name + "は身を守っている。");
    }

    static void escape(String name) {
        System.out.println(name + "は逃げ出した！");
    }

    public static void main(String[] args) {
        Random rand = new Random();
        
        // 勇者のステータス
        String name = "勇者";
        int level = 13; int hp = 111; int strength = 58; int toughness = 34;

        // 【課題3-4】スライムの群れのステータス（配列管理）
        String[] monstersName = {"スライムA", "スライムB"};
        int[] monstersLevel = {5, 7};
        int[] monstersHp = {20, 26};
        int[] monstersStrength = {20, 24};
        int[] monstersToughness = {10, 14};

        for (String mName : monstersName) {
            System.out.println(mName + "が現れた！");
        }
        printStatus(name, level, hp, strength, toughness);
        for (int i = 0; i < monstersName.length; i++) {
            printStatus(monstersName[i], monstersLevel[i], monstersHp[i], 
                        monstersStrength[i], monstersToughness[i]);
        }

        System.out.print("[1] 攻撃 [2] 防御 [3] 逃げる [4] 全体攻撃 : ");
        Scanner stdIn = new Scanner(System.in);
        final int command = stdIn.nextInt();
        stdIn.close();

        switch (command) { // (a)
            case 1:
                // ランダムに敵を1体選ぶ
                int target = rand.nextInt(monstersName.length);
                // (k) 選んだ敵に攻撃
                int damage = attack(name, strength, monstersName[target], monstersToughness[target]);
                monstersHp[target] = damaged(monstersName[target], monstersHp[target], damage);
                printStatus(monstersName[target], monstersLevel[target], 
                            monstersHp[target], monstersStrength[target], monstersToughness[target]);
                isDefeated(monstersName[target], monstersHp[target]);
                break;

            case 2:
                guard(name);
                break;

            case 3:
                escape(name);
                break;

            case 4:
                System.out.println(name + "の全体攻撃！");
                for (target = 0; target < monstersName.length; target++) {
                    // (k) 全ての敵に対して攻撃処理
                    damage = attack(name, strength, monstersName[target], monstersToughness[target]);
                    monstersHp[target] = 
                        damaged(monstersName[target], monstersHp[target], damage);
                    printStatus(monstersName[target], monstersLevel[target], 
                                monstersHp[target], monstersStrength[target], 
                                monstersToughness[target]);
                    isDefeated(monstersName[target], monstersHp[target]);
                }
                break;

            default:
                System.out.println("1-4 のいずれかを入力してください。");
                break;
        }

        // 全滅判定の呼び出し
        if (isDefeated(monstersHp) == true) {
            System.out.println("モンスターを殲滅した！");
        }
    }
}