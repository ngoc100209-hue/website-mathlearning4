'use client';

import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { LogIn, LogOut, UserCircle2 } from 'lucide-react';

export default function AuthPanel() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useUser();

  const handleOpenAuth = () => {
    router.push('/auth?redirect_url=/profile');
  };

  const handleLogout = async () => {
    await signOut({ redirectUrl: '/' });
  };

  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={isSignedIn ? () => router.push('/profile') : handleOpenAuth}
        className="flex items-center gap-2 rounded-full border border-outline-variant px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-fixed transition-colors"
      >
        {isSignedIn ? <UserCircle2 size={18} /> : <LogIn size={18} />}
        {isSignedIn ? 'Hồ sơ' : 'Đăng nhập'}
      </button>

      {isSignedIn ? (
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-outline-variant px-3 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      ) : null}
    </div>
  );
}
