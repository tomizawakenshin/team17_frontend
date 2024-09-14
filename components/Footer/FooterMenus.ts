// フッターメニューのアイコン・ラベルを格納した配列ファイル
import { House, Rocket, UserRound } from "lucide-react"; // lucide-reactから、アイコンを取得

export const FooterMenus = [
    {
        // ホーム画面のメニュー
        link: '/home1',
        label: 'ホーム',
        icon: House, // iconは文字列ではなく、クラス？を指定するため具ウォーテーションがいらない
    },
    {
        // 新規作成のメニュー
        link: '/new',
        label: '花火作成',
        icon: Rocket,
    },
    {
        // プロフィールのメニュー
        link: '',
        label: 'プロフィール',
        icon: UserRound,
    },
];

export default FooterMenus;