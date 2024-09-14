import React from 'react';
import Link from 'next/link';
import { RefreshCcw } from 'lucide-react';



const Header = () => {
  return (
    <header className="h-14 bg-black text-white flex items-center space-x-2 px-4 w-full shadow-md s justify-between p-10 fixed" >
      <h1 className="p-2 font-bold text-2xl">
        <Link href="/">Hidane</Link>
      </h1>
      <div className="p-2 bg-gray-800 rounded-xl">
        <Link href="/home2">
          <RefreshCcw stroke="white" />
        </Link>
      </div>
    </header>
  )
}

export default Header