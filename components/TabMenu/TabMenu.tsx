"use client"
import { useState, useEffect } from "react";

interface TabMenuProps {
    onDateChange: (date: string) => void; // 日付が変更されたときに呼び出される関数
}

const TabMenu: React.FC<TabMenuProps> = ({ onDateChange }) => {

    // 日付を取得してフォーマットする関数
    const formatDate = (date: Date): string => {
        const month = date.getMonth() + 1; // 月は0から始まるので+1
        const day = date.getDate();
        return `${month}/${day}`;
    };

    // 今日、昨日、一昨日の日付を取得
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    // タイトル内の文字を配列で定義
    const titles = [formatDate(twoDaysAgo), formatDate(yesterday), formatDate(today)];

    //タブのクリック状態をuseStateで管理
    const [clickedTab, setClickedTab] = useState<number>(0);

    // クリックイベントハンドラ
    const handleClick = (index: number) => {
        setClickedTab(index);
    };

    // タブがクリックされたときに、日付をフォーマットして親コンポーネントに渡す
    useEffect(() => {
        const dateParts = titles[clickedTab].split('/');
        const formattedDate = `2024-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
        onDateChange(formattedDate); // 親に通知
    }, [clickedTab, titles, onDateChange]);

    return (
        <div className="flex justify-between w-11/12 mx-auto p-2 mt-10 gap-x-3">
            {titles.map((title, index) => (
                <button
                    key={index}
                    className="border-2 w-full h-full rounded-3xl py-1"
                    onClick={() => handleClick(index)}
                    style={{
                        backgroundColor: clickedTab === index ? 'white' : 'black',
                        color: clickedTab === index ? 'black' : 'white',
                        fontWeight: clickedTab === index ? 'bold' : 'normal',
                    }}
                >
                    {title}
                </button>
            ))}
        </div>
    );
};

export default TabMenu;
