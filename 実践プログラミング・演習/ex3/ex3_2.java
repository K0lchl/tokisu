import java.util.Scanner;

public class ex3_2 {
    static void printStatus(String name, int level, int hp, int strength, int toughness) {
        System.out.println(name + " {Lv: " + level + ", HP: " + hp +
                           ", 力: " + strength + ", 守: " + toughness + "}");
    }

    static int attack(String subjectName, int subjectStrength, 
                      String targetName, int targetToughness) {
        System.out.println(subjectName + "は" + targetName + "に攻撃した！");
        int damage = subjectStrength - targetToughness;
        return damage;
    }

    static int damaged(String name, int hp, int damage) {
        if (damage <= 0) {
            System.out.println(name + "はダメージをうけない！");
            return hp;
        }

        System.out.println(name + "は" + damage + "のダメージをうけた！");
        hp -= damage;
        hp = (hp < 0) ? 0 : hp; // ここにあなたの提案した処理が入っていますね！
        return hp;
    }

    static boolean isDefeated(String name, int hp) {
        if (hp > 0) {
            return false; // (e)
        }

        System.out.println(name + "は力尽きた...");
        return true;
    }

    static void guard(String name) {
        System.out.println(name + "は身を守っている。");
    }

    static void escape(String name) {
        System.out.println(name + "は逃げ出した！");
    }

    public static void main(String[] args) {
        // 勇者のステータス
        String name = "勇者";
        int level = 13;
        int hp = 111;
        int strength = 12;
        int toughness = 34;

        // ゴブリンのステータス
        String monsterName = "ゴブリン";
        int monsterLevel = 6;
        int monsterHp = 42;
        int monsterStrength = 24;
        int monsterToughness = 12;

        System.out.println(monsterName + "が現れた！");
        printStatus(name, level, hp, strength, toughness);
        printStatus(monsterName, monsterLevel, monsterHp, monsterStrength, monsterToughness);

        System.out.print("[1] 攻撃 [2] 防御 [3] 逃げる : ");
        Scanner stdIn = new Scanner(System.in);
        final int command = stdIn.nextInt();
        stdIn.close();

        switch (command) { // (a)
            case 1:
                int damage = attack(name, strength, monsterName, monsterToughness); // (f)
                monsterHp = damaged(monsterName, monsterHp, damage);
                printStatus(monsterName, monsterLevel, monsterHp, 
                            monsterStrength, monsterToughness);
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
    }
}
