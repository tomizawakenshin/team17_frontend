"use client";
import React from "react"
import { useState } from "react";
import Link from "next/link";

import { FooterMenus } from './FooterMenus'; // FooterMenusファイルからフッターメニューの情報を取得する

import './Footer.css'

const Footer: React.FC = () => {
     // スタイルの初期状態を宣言
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <footer className='sticky bottom-0 z-10 bg-gray-800'> 
               <ul className="grid grid-cols-3">
                {FooterMenus.map((menu, index) => (
                    <li key={index}>
                        <Link href={menu.link} className="flex flex-col items-center justify-center gap-1 py-1.5 text-xs">
                        {/* フッターメニューのアイコンを表示する */}
                        <div >
                            <menu.icon className="iconImqge" size={24} onClick={() => setSelected(!selected)} stroke="white" fill={ selected ? "white" : "none" } />
                        </div>
                        
                        {/* フッターメニューのラベルを表示する(非表示) */}
                            {/* {menu.label} */}
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    );
};

export default Footer;
