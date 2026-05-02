import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // (2) final変数を三つ宣言
        final int HERB_PRICE = 10; // 薬草の値段
        final int ANTIDOTE_PRICE = 25; // 毒消しの値段
        final int PANACEA_PRICE = 100; // 万能薬の値段

        System.out.println("道具屋「いらっしゃい！ここは道具屋です。」");

        Scanner stdIn = new Scanner(System.in);

        // (a) キーボードから個数を入力する処理
        System.out.println("道具屋「薬草 (10G) をいくつ買いますか？」:");
        int herb = stdIn.nextInt();

        System.out.println("道具屋「毒消し (25G) をいくつ買いますか？」:");
        int antidote = stdIn.nextInt();

        System.out.println("道具屋「万能薬 (100G) をいくつ買いますか？」:");
        int panacea = stdIn.nextInt();

        System.out.println("道具屋「薬草 " + herb + " 個、毒消し " + antidote +
                " 個、万能薬 " + panacea + " 個ですね。");

        // (b) 合計金額の計算と表示
        System.out.println("合計で " +
                (herb * HERB_PRICE + antidote * ANTIDOTE_PRICE + panacea * PANACEA_PRICE) +
                "G になります。」");

        stdIn.close();
    }
}