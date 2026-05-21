export const artisans = [
    {
        id: 'cw',
        name: '渡辺キャロライン',
        nameKana: 'わたなべ・キャロライン',
        kiln: '二子窯',
        kilnKana: 'ふたごがま',
        timeline: [
            { year: '1965年', event: '米国ニュージャージー州生まれ' },
            { year: '1987年', event: 'コロンビア大学（日本文学専攻）卒業' },
            { year: '1987年', event: '石川県珠洲市に移住' },
            { year: '1988年', event: '珠洲焼陶芸家渡邊治氏と結婚、二子窯を築窯' },
            { year: '1998年', event: '渡邊治氏逝去' },
            { year: '2000年', event: '珠洲焼の制作を始める' },
        ],
        comment: '珠洲焼と向かい合う時間を大切にしたい。',
        bio: 'これまで焼き物に関わる時間があまりにも少なくて欲求不満な状態が続いていましたが、これから少しずつ珠洲焼に掛けられる時間を増やしていきたいと思います。',
        awards: [],
        instagram: null,
        image: '/images/artisan_cw.png'
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
