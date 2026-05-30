public class Ghost extends Creature {

    Ghost(String name, int level, int hp, int strength, int toughness) {
        super(name, level, hp, strength, toughness);
    }

    // 親クラスの damaged メソッドを上書き（オーバーライド）する
    @Override
    public void damaged(int damage) {
        // Math.random() は 0.0 以上 1.0 未満のランダムな小数を返す
        // 0.5 未満（全体の50%の確率）なら攻撃をすり抜ける
        if (Math.random() < 0.5) {
            System.out.println(this.name + "は体を半透明にして攻撃をすり抜けた！");
            System.out.println(this.name + "はダメージをうけない！");
        } else {
            // 残り50%の確率は通常通りダメージを受ける（親クラスの処理をそのまま呼び出す）
            super.damaged(damage);
        }
    }
}
