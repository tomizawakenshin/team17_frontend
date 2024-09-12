import React from "react"
import { FooterMenus } from './FooterMenus'; // FooterMenusファイルからフッターメニューの情報を取得する

import './Footer.css'

const Footer: React.FC = () => {
    return (

        <footer className='fixed bottom-0 z-10 bg-gray-800 width-[78%]'> 
               <ul className="grid grid-cols-3">
                {FooterMenus.map((menu, index) => (
                    <li key={index}>
                        <a href="{menu.link}" className="flex flex-col items-center justify-center gap-1 py-1.5 text-xs">
                        {/* フッターメニューの情報を表示する */}
                        <menu.icon className="iconImqge" stroke="white" size={24}/>
                        {/* フッターメニューのラベルを表示する(非表示) */}
                            {/* {menu.label} */}
                        </a>
                    </li>
                ))}
            </ul>
        </footer>

        
    );
};

export default Footer;
