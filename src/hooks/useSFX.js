import { useCallback, useRef } from 'react';

/**
 * 効果音（SFX）を管理するフック
 * 重複再生や遅延を抑えるための簡易マネージャー
 */
export function useSFX() {
    const audioContext = useRef(null);
    
    // より「カチッ」とした機械的でシャープなクリック音を生成
    const playClick = useCallback(() => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const ctx = audioContext.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // 矩形波と急激な周波数変化で「カチッ」というアタック感を作る
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.015);
        
        // 非常に短い時間で音量を減衰させる
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.015);
    }, []);

    // 外部ファイル（陶器の音など）を再生する場合の関数
    const playSound = useCallback((src, volume = 0.5) => {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch(e => console.log("SFX play blocked", e));
    }, []);

    return { playTick, playSound };
}
