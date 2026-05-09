import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * 高級感のある音響体験を管理するフック
 * - 音量のフェードイン・フェードアウト
 * - ブラウザのオートプレイ制限への対応
 */
export function useSound(src, options = {}) {
    const { loop = true, initialVolume = 0, maxVolume = 0.6 } = options;
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(initialVolume);
    const fadeInterval = useRef(null);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = loop;
        audio.volume = volume;
        audioRef.current = audio;

        return () => {
            if (fadeInterval.current) clearInterval(fadeInterval.current);
            audio.pause();
            audioRef.current = null;
        };
    }, [src, loop]);

    const fade = useCallback((targetVolume, duration = 2000) => {
        if (!audioRef.current) return;
        
        if (fadeInterval.current) clearInterval(fadeInterval.current);
        
        // 音量が0より大きく設定され、かつ現在停止している場合は再生を再開する
        if (targetVolume > 0 && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.warn("Audio resume blocked", e));
        }

        const currentVol = audioRef.current.volume;
        const volumeDiff = Math.abs(currentVol - targetVolume);
        
        if (volumeDiff === 0) {
            if (targetVolume === 0 && !audioRef.current.paused) {
                audioRef.current.pause();
            }
            return;
        }

        // durationが短い場合は即座に切り替え（ポップノイズ防止のため最低限の時間は確保）
        if (duration <= 50) {
            audioRef.current.volume = targetVolume;
            setVolume(targetVolume);
            if (targetVolume === 0) audioRef.current.pause();
            return;
        }

        const step = volumeDiff / (duration / 30);

        fadeInterval.current = setInterval(() => {
            if (!audioRef.current) {
                clearInterval(fadeInterval.current);
                return;
            }

            const currentVol = audioRef.current.volume;
            if (Math.abs(currentVol - targetVolume) < step) {
                audioRef.current.volume = targetVolume;
                setVolume(targetVolume);
                clearInterval(fadeInterval.current);
                // 完全に音量が0になったらリソース節約と確実な消音のためにpauseを呼ぶ
                if (targetVolume === 0) {
                    audioRef.current.pause();
                }
            } else {
                const nextVol = currentVol + (targetVolume > currentVol ? step : -step);
                audioRef.current.volume = Math.max(0, Math.min(1, nextVol));
                setVolume(nextVol);
            }
        }, 30);
    }, []);

    const fadeTo = useCallback((targetVolume, duration) => {
        fade(targetVolume, duration);
    }, [fade]);

    const play = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.play().then(() => {
            setIsPlaying(true);
            // 自動フェードはApp.jsxのuseEffect(ダイナミックミキシング)に任せるため削除
        }).catch(err => {
            console.warn("Audio play blocked by browser", err);
        });
    }, []);

    const stop = useCallback(() => {
        // Ambient Off時は即座(300ms)に消音する
        fade(0, 300);
        setIsPlaying(false);
    }, [fade]);

    const toggle = useCallback(() => {
        if (isPlaying) stop();
        else play();
    }, [isPlaying, play, stop]);

    return useMemo(() => ({ 
        isPlaying, 
        volume, 
        play, 
        stop, 
        toggle, 
        fadeTo 
    }), [isPlaying, volume, play, stop, toggle, fadeTo]);
}
