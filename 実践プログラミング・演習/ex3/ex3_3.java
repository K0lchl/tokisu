import java.util.Random;
import java.util.Scanner;

public class ex3_3 {
    // 【課題3-2より】ステータスを表示するメソッド
    static void printStatus(String name, int level, int hp, int strength, int toughness) {
        System.out.println(name + " {Lv: " + level + ", HP: " + hp +
                           ", 力: " + strength + ", 守: " + toughness + "}");
    }

    // 【課題3-2より】通常の攻撃処理メソッド（引数4つ）
    static int attack(String subjectName, int subjectStrength, 
                      String targetName, int targetToughness) {
        System.out.println(subjectName + "は" + targetName + "に攻撃した！");
        int damage = subjectStrength - targetToughness;
        return damage;
    }

    // 【課題3-3追加分】会心の一撃用メソッド（引数3つ：(g)を適用）
    static int attack(String subjectName, int subjectStrength, String targetName) {
        System.out.println(subjectName + "は" + targetName + "に会心の一撃！");
        int damage = subjectStrength; // (g) 主体者の力をそのままダメージとする
        return damage;
    }

    // 【課題3-2より】ダメージ処理メソッド
    static int damaged(String name, int hp, int damage) {
        if (damage <= 0) {
            System.out.println(name + "はダメージをうけない！");
            return hp;
        }
        System.out.println(name + "は" + damage + "のダメージをうけた！");
        hp -= damage;
        // HPが0未満になった場合、0にする
        hp = (hp < 0) ? 0 : hp;
        return hp;
    }

    // 【課題3-2より】力尽きたか判定するメソッド
    static boolean isDefeated(String name, int hp) {
        if (hp > 0) {
            return false;
        }
        System.out.println(name + "は力尽きた...");
        return true;
    }

    // 【課題3-1より】防御と逃げる
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
        int level = 13;
        int hp = 111;
        int strength = 58;
        int toughness = 34;

        // ゴールデンスライムのステータス（実行例1, 2に基づく）
        String monsterName = "ゴールデンスライム";
        int monsterLevel = 10;
        int monsterHp = 12;
        int monsterStrength = 40;
        int monsterToughness = 255;

        System.out.println(monsterName + "が現れた！");
        printStatus(name, level, hp, strength, toughness);
        printStatus(monsterName, monsterLevel, monsterHp, monsterStrength, monsterToughness);

        Scanner stdIn = new Scanner(System.in);
        System.out.print("[1] 攻撃 [2] 防御 [3] 逃げる : ");
        int command = stdIn.nextInt();

        switch (command) { // (a)
            case 1:
                // (h) 1/3の確率で0が出るように設定 (0, 1, 2の3通り)
                int critical = rand.nextInt(3); 
                int damage;
                
                if (critical == 0) {
                    // (i) 会心の一撃：引数3つのattackを呼び出す
                    damage = attack(name, strength, monsterName);
                } else {
                    // (f) 通常攻撃：引数4つのattackを呼び出す
                    damage = attack(name, strength, monsterName, monsterToughness);
                }
                
                monsterHp = damaged(monsterName, monsterHp, damage);
                printStatus(monsterName, monsterLevel, monsterHp, monsterStrength, monsterToughness);
                isDefeated(monsterName, monsterHp);
                break;
                
            case 2:
                guard(name);
                break;
                
            case 3:
                escape(name);
                break;
                
            default: // (d)
                System.out.println("1-3 のいずれかを入力してください。");
                break;
        }
        stdIn.close();
    }
}