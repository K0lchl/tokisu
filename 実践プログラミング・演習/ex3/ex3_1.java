import java.util.Scanner;

public class ex3_1 {
    public static void main(String[] args) {
        // 勇者のステータス
        String name = "勇者";     // 名前
        int level = 6;           // レベル
        int hp = 55;            // HP
        int strength = 27;      // 力
        int toughness = 20;     // 守

        // ゴブリンのステータス
        String monsterName = "ゴブリン"; // 名前
        int monsterLevel = 6;           // レベル
        int monsterHp = 42;             // HP
        int monsterStrength = 24;       // 力
        int monsterToughness = 12;      // 守

        System.out.println(monsterName + "が現れた！");
        System.out.println(name + " {Lv: " + level + ", HP: " + hp + 
                           ", 力: " + strength + ", 守: " + toughness + "}");
        System.out.println(monsterName + " {Lv: " + monsterLevel + 
                           ", HP: " + monsterHp + ", 力: " + monsterStrength + 
                           ", 守: " + monsterToughness + "}");

        Scanner stdIn = new Scanner(System.in);
        System.out.print("[1] 攻撃 [2] 防御 [3] 逃げる : ");
        int command = stdIn.nextInt();
        stdIn.close();

        switch (command) { 
            case 1:
                System.out.println(name + "は" + monsterName + "に攻撃した！");
                int damage = strength - monsterToughness;

                if (damage <= 0) {
                    System.out.println(monsterName + "はダメージをうけない！");
                } else {
                    System.out.println(monsterName + "は" + damage + 
                                       "のダメージをうけた！");
                    monsterHp -= damage;

                    monsterHp = (monsterHp < 0) ? 0 : monsterHp;
                    System.out.println(monsterName + " {Lv: " + monsterLevel + 
                                       ", HP: " + monsterHp + 
                                       ", 力: " + monsterStrength + 
                                       ", 守: " + monsterToughness + "}");

                    if (monsterHp <= 0) { // (c)
                        System.out.println(monsterName + "は力尽きた...");
                    }
                }
                break;
            case 2:
                System.out.println(name + "は身を守っている。");
                break;

            case 3:
                System.out.println(name + "は逃げ出した！");
                break;

            default:
                System.out.println("1-3 のいずれかを入力してください。");
                break;
        }
    }
}