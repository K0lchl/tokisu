import java.util.*;

public class ex1_3 {
    public static void main(String[] args) {
        //勇者のステータス
        String name = "勇者";
        int level = 3;
        int hp = 31;
        int strength = 18;
        int toughness = 14;
        int levelInc = 1;
        int hpInc = 8;
        int strengthInc = 3;
        int toughnessInc = 2;
        
        System.out.println("勇者はステータスを確認した。");
        System.out.println(name + " {Lv: " + level + " , HP: " + hp + ", 力: " + strength + ", 守: " + toughness + "}");

        System.out.println("勇者はレベルが " + (level + levelInc) + " に上がった！");
        System.out.println("HPが " + hpInc + " 上がった！");
        System.out.println("力が " + strengthInc + " 上がった！");
        System.out.println("守が " + toughnessInc + " 上がった！");
        System.out.println(name + " {Lv: " + (level + levelInc) + " , HP: " + (hp + hpInc) + ", 力: " + (strength + strengthInc) + ", 守: " + (toughness + toughnessInc) + "}");
    }
}