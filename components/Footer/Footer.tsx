"use client";
import React from "react"
import { useState } from "react";
import Link from "next/link";

import { FooterMenus } from './FooterMenus'; // FooterMenusファイルからフッターメニューの情報を取得する

import './Footer.css'

const Footer: React.FC = () => {
     // スタイルの初期状態を宣言
    const [selected, setSelected] = useState<number | null>(null); 
    // const [selected, setSelected] = useState<number>(0); // 初期位置の塗りをホームにする場合には「useState<number>(0)」と設定する

    // クリックイベントハンドラ
    const handleClick = (index: number) => {
        setSelected(index);
    }

    return (
        <footer className='fixed bottom-0 z-10 bg-gray-800'> 
               <ul className="grid grid-cols-3">
                {FooterMenus.map((menu, index) => (
                    <li key={index}> 
                        <Link href={menu.link} className="flex flex-col items-center justify-center gap-1 py-1.5 text-xs">
                        {/* フッターメニューのアイコンを表示する */}
                        <div >
                            <menu.icon className="iconImqge" 
                                size={24}
                                onClick={() => handleClick(index)} stroke="white"
                                style={{
                                    fill: selected === index ? "white" : "none",
                                }} />
                        </div>

                        
                            {/* {menu.label} */}
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    );
};

export default Footer;