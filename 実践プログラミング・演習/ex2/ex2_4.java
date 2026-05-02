import java.util.Scanner;

//Y240223 圓堂光一

public class ex2_4 {
    public static void main(String[] args) {
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
        System.out.println(name + "の力：");
        strength = stdIn.nextInt();

        System.out.println(monsterName + "が現れた！");
        System.out.println(name + " {Lv: " + level + ", HP: " + hp + ", 力: " + strength + ", 守: " + toughness + "}");
        System.out.println(monsterName + " {Lv: " + monsterLevel + ", HP: " + monsterHp + ", 力: " + monsterStrength
                + ", 守: " + monsterToughness + "}");

        // ヒントにあるターン数の変数
        int turn = 1;

        // --- ここから do-while 文 ---
        do {
            System.out.println(turn + "ターン目：");
            System.out.println(name + "は" + monsterName + "に攻撃した！");

            int damage = strength - monsterToughness;

            if (damage <= 0) {
                System.out.println(monsterName + "はダメージをうけない！");
                // ダメージを与えられないと無限ループになるので注意が必要ですが、
                // 実行例に合わせてそのまま進めます。
            } else {
                System.out.println(monsterName + "は" + damage + "のダメージをうけた！");
                monsterHp -= damage;
                // HPが0未満にならないように調整
                monsterHp = (monsterHp < 0) ? 0 : monsterHp;

                System.out.println(monsterName + " {Lv: " + monsterLevel + ", HP: " + monsterHp + ", 力: "
                        + monsterStrength + ", 守: " + monsterToughness + "}");

                if (monsterHp <= 0) {
                    System.out.println(monsterName + "は力尽きた...");
                }
            }

            turn++; // ターンを増やす

        } while (monsterHp > 0); // スライムのHPが0より大きい間、攻撃を繰り返す

        stdIn.close();
    }
}