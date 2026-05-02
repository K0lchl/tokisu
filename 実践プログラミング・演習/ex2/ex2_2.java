import java.util.Scanner;

public class ex2_2 {
    public static void main(String[] a24rgs) {
        // 勇者のステータス
        String name = "勇者";
        int level = 5;
        int hp = 47;
        int strength;
        int toughness = 18;

        // スライムのステータス
        String monsterName = "スライム";
        int monsterLevel = 5;
        int monsterHp = 20;
        int monsterStrength = 20;
        int monsterToughness = 10;

        Scanner stdIn = new Scanner(System.in);
        System.out.println(name + "の力:");
        strength = stdIn.nextInt();
        // stdIn.close(); // ここで閉じると後で使えなくなる場合があるため最後に移動

        System.out.println(monsterName + "が現れた！");
        System.out.println(name + " {Lv: " + level + ", HP: " + hp + 
                           ", 力: " + strength + ", 守: " + toughness + "}");
        System.out.println(monsterName + " {Lv: " + monsterLevel + 
                           ", HP: " + monsterHp + ", 力: " + monsterStrength + 
                           ", 守: " + monsterToughness + "}");

        System.out.println(name + "は" + monsterName + "に攻撃した！");
        int damage = strength - monsterToughness;

        if (damage <= 0) {
            System.out.println(monsterName + "はダメージをうけない！");
        } else {
            System.out.println(monsterName + "は" + damage + "のダメージをうけた！");
            monsterHp -= damage;
            
            // (c) 三項演算子を用いてHPが0未満になる場合は0にする
            monsterHp = (monsterHp < 0) ? 0 : monsterHp;

            System.out.println(monsterName + " {Lv: " + monsterLevel + 
                               ", HP: " + monsterHp + ", 力: " + monsterStrength + 
                               ", 守: " + monsterToughness + "}");

            // (d) if文を用いて力尽きたか判定する
            if (monsterHp <= 0) {
                System.out.println(monsterName + "は力尽きた...");
            }
        }
        stdIn.close();
    }
}