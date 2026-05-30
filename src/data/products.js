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

// 陶芸家ごとにグループ化し、陶芸家の詳細プロフィールも付与するヘルパー関数
export const getProductsByArtisan = (productsList = []) => {
    const grouped = {};
    productsList.forEach(product => {
        // DBからは artisan_id が来る想定、静的データなら artisanId
        const key = product.artisan_id || product.artisanId;
        const artisanInfo = artisans.find(a => a.id === key);
        
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
