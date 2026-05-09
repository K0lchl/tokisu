import { useCallback, useRef } from 'react';

/**
 * 効果音（SFX）を管理するフック
 * 重複再生や遅延を抑えるための簡易マネージャー
 */
export function useSFX() {
    const audioContext = useRef(null);
    
    // シンプルな電子的なクリック音を生成（外部ファイル不要）
    const playTick = useCallback(() => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const ctx = audioContext.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }, []);

    // 外部ファイル（陶器の音など）を再生する場合の関数
    const playSound = useCallback((src, volume = 0.5) => {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch(e => console.log("SFX play blocked", e));
    }, []);

    return { playTick, playSound };
}
