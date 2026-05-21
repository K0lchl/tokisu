export const products = [
    {
        id: 'cw-001',
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
        artisan: '渡辺キャロライン',
        kiln: '二子窯',
        name: '珠洲焼 花入れ',
        price: 18000,
        description: '丸みを帯びた小ぶりな花入れ。野の花を一輪生けるだけで空間に静寂をもたらします。特有の黒灰色のグラデーションが美しい一品。',
        image: '/images/caroline_2.png',
        stock: 1
    }
];

// 陶芸家ごとにグループ化するためのヘルパー関数
export const getProductsByArtisan = () => {
    const grouped = {};
    products.forEach(product => {
        const key = `${product.kiln} | ${product.artisan}`;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(product);
    });
    return Object.entries(grouped).map(([artisanName, items]) => ({
        artisanName,
        items
    }));
};
