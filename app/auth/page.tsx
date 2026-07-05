'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect_url') || '/profile';
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (!signUp) {
          throw new Error('Clerk chưa sẵn sàng.');
        }

        const parsedAge = parseInt(age, 10);
        if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
          setError('Tuổi không hợp lệ. Vui lòng nhập số nguyên lớn hơn 0.');
          setIsSubmitting(false);
          return;
        }

        const result = await signUp.create({
          emailAddress: email,
          password,
          unsafeMetadata: {
            fullName: fullName.trim(),
            age: parsedAge,
            location: location.trim(),
          },
        });

        if (result.status === 'complete' && result.createdSessionId) {
          await setActiveSignUp({ session: result.createdSessionId });
          router.push('/profile');
          return;
        }

        if (result.status === 'missing_requirements') {
          await signUp.prepareEmailAddressVerification();
          setError('Đăng ký gần xong. Vui lòng xác minh email trước khi tiếp tục.');
        } else {
          setError('Không thể tạo tài khoản. Vui lòng thử lại.');
        }
      } else {
        if (!signIn) {
          throw new Error('Clerk chưa sẵn sàng.');
        }

        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === 'complete' && result.createdSessionId) {
          await setActiveSignIn({ session: result.createdSessionId });
          router.push(redirectPath);
          return;
        }

        setError('Không thể đăng nhập. Vui lòng kiểm tra thông tin.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-xl md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Clerk Authentication</p>
            <h1 className="text-3xl font-bold text-on-surface">Đăng ký hoặc đăng nhập để tiếp tục học</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Cung cấp email, tên, tuổi và khu vực để cá nhân hóa hồ sơ học tập.</p>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface px-3 py-2 text-sm font-semibold text-primary">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              Bảo mật bằng Clerk
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 rounded-2xl bg-surface p-2">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          >
            Đăng ký
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${mode === 'signin' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          >
            Đăng nhập
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-on-surface md:col-span-2">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary"
              placeholder="name@example.com"
            />
          </label>

          <label className="text-sm font-semibold text-on-surface md:col-span-2">
            Mật khẩu
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary"
              placeholder="Nhập mật khẩu"
            />
          </label>

          {mode === 'signup' ? (
            <>
              <label className="text-sm font-semibold text-on-surface">
                Tên học sinh
                <input
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary"
                  placeholder="Ví dụ: An"
                />
              </label>

              <label className="text-sm font-semibold text-on-surface">
                Tuổi
                <input
                  type="number"
                  min={1}
                  required
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary"
                  placeholder="Ví dụ: 7"
                />
              </label>

              <label className="text-sm font-semibold text-on-surface md:col-span-2">
                Khu vực sinh sống
                <input
                  required
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary"
                  placeholder="Ví dụ: Hà Nội"
                />
              </label>
            </>
          ) : null}

          {error ? <p className="rounded-xl bg-error/10 p-3 text-sm text-error md:col-span-2">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
          >
            {isSubmitting ? 'Đang xử lý...' : mode === 'signup' ? 'Tạo tài khoản' : 'Đăng nhập'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary-container/20 p-4 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Sparkles size={16} />
            Sau khi đăng nhập, bạn sẽ được chuyển thẳng đến hồ sơ cá nhân.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-on-surface-variant">Đang tải...</div>}>
      <AuthContent />
    </Suspense>
  );
}
