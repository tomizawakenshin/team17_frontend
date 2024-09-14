"use client"
import { useState } from "react";

const TabMenu = () => {

    // タイトル内の文字を配列で定義
    const titles = ['9/1', '9/2', '9/3'];

    //タブのクリック状態をuseStateで管理
    const [clickedTab, setclickedTab] = useState<number | null>(null);

    // クリックイベントハンドラ
    const handleClick = (index: number) => {
        setclickedTab(index);
    }


    return (
        <div className="flex justify-between w-11/12 mx-auto p-2 mt-4 gap-x-3">
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
}

export default TabMenu;