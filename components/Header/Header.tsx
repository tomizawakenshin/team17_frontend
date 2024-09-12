import React from 'react';
import Link from 'next/link';
import { RefreshCcw } from 'lucide-react';



const Header = () => {
  return (
    <header className="h-14 bg-emerald-400/90 text-white flex items-center space-x-2 px-2 w-full shadow-md">
      <h1>
        <Link href="/">Hanabi</Link>
      </h1>
      <div>
        <Link href="/home2">
          <RefreshCcw />
        </Link>
      </div>
    </header>
  )
}

export default Header