import React from 'react';
import './Firework.css'; // CSS ファイルをインポート
import { GiWaterDrop } from 'react-icons/gi'; // アイコンをインポート
import Link from '@/node_modules/next/link';

const Firework = () => {
  return (
    <div className="firework-container ">
      <Link
      href="/comment">
      <div className="center-dot"></div>
      {Array.from({ length: 6 }).map((_, index) => (
        <GiWaterDrop key={index} className="dot1" style={{ '--n': index }} />
      ))}
      {Array.from({ length: 12 }).map((_, index) => (
        <GiWaterDrop key={index} className="dot2" style={{ '--n': index }} />
      ))}
      {Array.from({ length: 24 }).map((_, index) => (
        <GiWaterDrop key={index} className="dot3" style={{ '--n': index }} />
      ))}
      </Link>
    </div>
  );
};

export default Firework;


