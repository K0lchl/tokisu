import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, delay = 0 }) => (
    <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        className="mb-32 md:mb-48"
    >
        {children}
    </motion.section>
);

export default function StoryPage({ onBack }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl overflow-y-auto scroll-smooth">
            
            {/* プログレスバー */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-[1px] bg-white/40 z-[60] origin-left"
                style={{ scaleX: useScrollProgress() }}
            />

            {/* 戻るボタン (固定) */}
            <motion.nav 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed top-8 left-8 md:top-12 md:left-12 z-[60]"
            >
                <button 
                    onClick={onBack} 
                    className="group flex items-center gap-4 text-[10px] tracking-[0.4em] text-white/50 hover:text-white transition-colors uppercase"
                >
                    <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                    Back
                </button>
            </motion.nav>

            <div className="max-w-4xl mx-auto px-8 pt-40 pb-20">
                
                {/* ヒーロー */}
                <header className="mb-40 text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] tracking-[1em] text-white/30 uppercase block mb-8"
                    >
                        The Narrative
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
                        transition={{ duration: 1.5 }}
                        className="text-4xl md:text-6xl font-extralight mb-12"
                    >
                        珠洲の記憶
                    </motion.h2>
                </header>

                {/* 第一節：珠洲の地 */}
                <Section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h3 className="text-xl font-light tracking-[0.3em] mb-8 border-l border-white/20 pl-6">第一節：地の果て</h3>
                            <p className="text-sm leading-loose text-white/60 font-light tracking-widest">
                                石川県能登半島の最先端、珠洲。<br />
                                かつて日本海を行き交う船が立ち寄ったこの地には、
                                数百年の時を超えて受け継がれる「黒」の記憶があります。
                            </p>
                        </div>
                        <div className="order-1 md:order-2 aspect-video overflow-hidden rounded-sm grayscale opacity-80 hover:grayscale-0 transition-all duration-1000">
                            <img src="/story_suzu_landscape.png" alt="Suzu Landscape" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]" />
                        </div>
                    </div>
                </Section>

                {/* 第二節：黒い土の記憶 */}
                <Section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="aspect-video overflow-hidden rounded-sm opacity-80">
                            <img src="/story_suzuyaki_texture.png" alt="Suzu-yaki Texture" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-light tracking-[0.3em] mb-8 border-l border-white/20 pl-6">第二節：無垢なる黒</h3>
                            <p className="text-sm leading-loose text-white/60 font-light tracking-widest">
                                珠洲焼に、色彩はありません。<br />
                                釉薬を一切使わず、土に含まれる鉄分と薪の炎、そして「還元」という奇跡が、
                                金属のような光沢を放つ唯一無二の黒を生み出します。
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 第三節：不屈の火 */}
                <Section>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-full h-[400px] mb-12 overflow-hidden rounded-sm relative group">
                            <img src="/story_kiln_fire.png" alt="Kiln Fire" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>
                        <div className="max-w-xl">
                            <h3 className="text-xl font-light tracking-[0.3em] mb-8">第三節：絶やさぬ火</h3>
                            <p className="text-sm leading-loose text-white/60 font-light tracking-widest">
                                震災は、多くのものを奪い去りました。<br />
                                しかし、職人たちの指先は、土の感触を忘れてはいませんでした。
                                崩れた窯を立て直し、再び立ち上がる煙は、希望の証。
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 第四節：Tokisuの使命 */}
                <Section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-xl font-light tracking-[0.3em] mb-8 border-l border-white/20 pl-6">第四節：明日を刻む</h3>
                            <p className="text-sm leading-loose text-white/60 font-light tracking-widest">
                                Tokisuは、伝統の「守り人」ではありません。<br />
                                古の知恵を、現代の暮らしに溶け込む形へと再構築する。
                                珠洲焼の持つ生命力を、世界へ、そして未来へと繋いでいく。
                            </p>
                        </div>
                        <div className="aspect-[4/5] overflow-hidden rounded-sm opacity-80">
                            <img src="/story_craftsman_hands.png" alt="Craftsman Hands" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </Section>

                {/* フッター的な誘導 */}
                <motion.footer 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center pt-20 border-t border-white/10"
                >
                    <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-12">Experience more</p>
                    <button 
                        onClick={onBack}
                        className="px-12 py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-700 text-[10px] tracking-[0.2em] uppercase rounded-full"
                    >
                        Back to Home
                    </button>
                </motion.footer>
            </div>
        </div>
    );
}

// スクロール進捗を監視するカスタムフック
function useScrollProgress() {
    const [progress, setProgress] = React.useState(0);
    
    React.useEffect(() => {
        const container = document.querySelector('.overflow-y-auto');
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const scrollPercent = scrollTop / (scrollHeight - clientHeight);
            setProgress(scrollPercent);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}