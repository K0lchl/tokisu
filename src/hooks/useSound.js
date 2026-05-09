import { useEffect, useRef, useState } from 'react';

/**
 * 高級感のある音響体験を管理するフック
 * - 音量のフェードイン・フェードアウト
 * - ブラウザのオートプレイ制限への対応
 */
export function useSound(src, options = { loop: true, initialVolume: 0 }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(options.initialVolume);
    const fadeInterval = useRef(null);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = options.loop;
        audio.volume = volume;
        audioRef.current = audio;

        return () => {
            if (fadeInterval.current) clearInterval(fadeInterval.current);
            audio.pause();
            audioRef.current = null;
        };
    }, [src, options.loop]);

    const fade = (targetVolume, duration = 2000) => {
        if (!audioRef.current) return;
        
        if (fadeInterval.current) clearInterval(fadeInterval.current);
        
        const step = 0.02; // より滑らかに
        const intervalTime = duration / (Math.abs(targetVolume - audioRef.current.volume) / step || 100);
        
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
                if (targetVolume === 0 && isPlaying) {
                    // 音量が0になったら一時停止（ただしisPlayingの状態は維持してフェードインしやすくする）
                    // audioRef.current.pause(); 
                }
            } else {
                const nextVol = currentVol + (targetVolume > currentVol ? step : -step);
                audioRef.current.volume = Math.max(0, Math.min(1, nextVol));
                setVolume(nextVol);
            }
        }, 30);
    };

    const fadeTo = (targetVolume, duration) => {
        fade(targetVolume, duration);
    };

    const play = () => {
        if (!audioRef.current) return;
        audioRef.current.play().then(() => {
            setIsPlaying(true);
            fade(options.maxVolume || 0.6);
        }).catch(err => {
            console.warn("Audio play blocked by browser", err);
        });
    };

    const stop = () => {
        fade(0);
    };

    const toggle = () => {
        if (isPlaying) stop();
        else play();
    };

    return { isPlaying, volume, play, stop, toggle };
}
