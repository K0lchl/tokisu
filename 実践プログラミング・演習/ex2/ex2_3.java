import java.util.Scanner;

public class ex2_3 {
    public static void main(String[] args) {
        // 勇者のステータス
        String name = "勇者";
        int level = 9;
        int hp = 79;
        int strength = 36;
        int toughness = 26;

        // スライムの群れのステータスを配列で定義
        String[] monstersName = {"スライムA", "スライムB", "スライムC", "スライムD"};
        int[] monstersLevel = {5, 7, 4, 6};
        int[] monstersHp = {20, 26, 17, 23};
        int[] monstersStrength = {20, 24, 18, 22};
        int[] monstersToughness = {10, 14, 8, 12};

        // スライムたちの出現表示
        for (int i = 0; i < monstersName.length; i++) {
            System.out.println(monstersName[i] + "が現れた！");
        }

        // ステータス表示
        System.out.println(name + " {Lv: " + level + ", HP: " + hp + ", 力: " + strength + ", 守: " + toughness + "}");
        for (int i = 0; i < monstersName.length; i++) {
            System.out.println(monstersName[i] + " {Lv: " + monstersLevel[i] + ", HP: " + monstersHp[i] + ", 力: " + monstersStrength[i] + ", 守: " + monstersToughness[i] + "}");
        }

        // 攻撃目標の選択
        System.out.print("攻撃目標：");
        for (int i = 0; i < monstersName.length; i++) {
            System.out.print("[" + i + "] " + monstersName[i] + " ");
        }
        System.out.println("：");

        Scanner stdIn = new Scanner(System.in);
        int target = stdIn.nextInt();

        // 戦闘処理
        System.out.println(name + "は" + monstersName[target] + "に攻撃した！");
        int damage = strength - monstersToughness[target];

        if (damage <= 0) {
            System.out.println(monstersName[target] + "はダメージをうけない！");
        } else {
            System.out.println(monstersName[target] + "は" + damage + "のダメージをうけた！");
            monstersHp[target] -= damage;

            // (c) 三項演算子で0未満なら0にする
            monstersHp[target] = (monstersHp[target] < 0) ? 0 : monstersHp[target];

            System.out.println(monstersName[target] + " {Lv: " + monstersLevel[target] + ", HP: " + monstersHp[target] + ", 力: " + monstersStrength[target] + ", 守: " + monstersToughness[target] + "}");

            // (d) 力尽きたか判定
            if (monstersHp[target] <= 0) {
                System.out.println(monstersName[target] + "は力尽きた...");
            }
        }
        stdIn.close();
    }
}