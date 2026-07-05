'use client';

import { Menu, UserCircle2 } from "lucide-react";
import Link from "next/link";
import Navigation from '@/components/Navigation';

export default function Header() {
  return (
    <header className="bg-surface sticky top-0 z-50 w-full flex items-center border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 md:px-16 max-w-7xl mx-auto h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold text-primary">MathSign</span>
        </Link>

        <Navigation />

        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-outline-variant px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-fixed transition-colors duration-200"
          >
            <UserCircle2 size={20} />
            Hồ sơ cá nhân
          </Link>
          <button className="md:hidden text-on-surface flex items-center justify-center">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
