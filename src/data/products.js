export const artisans = [
    {
        id: 'cw',
        name: '渡辺キャロライン',
        kiln: '二子窯',
        bio: '珠洲に生まれ、地元の土と炎に魅了されて作陶の道へ。伝統的な珠洲焼の技法を守りながらも、現代の生活様式に溶け込むモダンなフォルムを追求している。',
        awards: [
            '2024年 現代陶芸展 優秀賞',
            '2025年 珠洲焼新興展 会長賞'
        ],
        comment: '土の記憶を呼び覚ますように、一つ一つの作品と向き合っています。手にとっていただいた方の日常に、静かな豊かさをもたらせる器であれば嬉しいです。',
        instagram: '@futagoyama_caroline',
        image: '/images/artisan_cw.png' // 仮のポートレート画像パス
    }
];

export const products = [
    {
        id: 'cw-001',
        artisanId: 'cw',
        artisan: '渡辺キャロライン',
        kiln: '二子窯',
        name: '珠洲焼 花器',
        price: 24000,
        description: '力強い造形の中に女性らしい柔らかな曲線を持たせた花器。薪窯で焼き締められた独特の灰被りが、生ける花をより一層引き立てます。',
        image: '/images/caroline_1.png',
        stock: 1
    },
    {
        id: 'cw-002',
        artisanId: 'cw',
        artisan: '渡辺キャロライン',
        kiln: '二子窯',
        name: '珠洲焼 花入れ',
        price: 18000,
        description: '丸みを帯びた小ぶりな花入れ。野の花を一輪生けるだけで空間に静寂をもたらします。特有の黒灰色のグラデーションが美しい一品。',
        image: '/images/caroline_2.png',
        stock: 1
    }
];

// 陶芸家ごとにグループ化し、陶芸家の詳細プロフィールも付与するヘルパー関数
export const getProductsByArtisan = () => {
    const grouped = {};
    products.forEach(product => {
        const artisanInfo = artisans.find(a => a.id === product.artisanId);
        const key = product.artisanId;
        
        if (!grouped[key]) {
            grouped[key] = {
                artisanInfo: artisanInfo || { name: product.artisan, kiln: product.kiln },
                items: []
            };
        }
        grouped[key].items.push(product);
    });
    return Object.values(grouped);
};
