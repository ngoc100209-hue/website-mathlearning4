'use client';

import { Hand, Menu } from "lucide-react";
import Link from "next/link";
import Navigation from '@/components/Navigation';

export default function Header() {
  return (
    <header className="bg-surface sticky top-0 z-50 w-full flex items-center border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 md:px-16 max-w-[1280px] mx-auto h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold text-primary">MathSign</span>
        </Link>

        <Navigation />

        <div className="flex items-center gap-4">
          <button className="text-primary p-2 rounded-full hover:bg-primary-fixed transition-colors duration-200 flex items-center justify-center">
            <Hand size={28} />
          </button>
          <button className="md:hidden text-on-surface flex items-center justify-center">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
