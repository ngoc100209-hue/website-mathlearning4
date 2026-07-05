'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const extractClerkErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const maybeClerkError = error as {
      message?: string;
      errors?: Array<{ longMessage?: string; message?: string }>;
    };

    const firstNestedMessage = maybeClerkError.errors?.[0]?.longMessage || maybeClerkError.errors?.[0]?.message;
    if (firstNestedMessage) {
      return firstNestedMessage;
    }

    if (maybeClerkError.message) {
      return maybeClerkError.message;
    }
  }

  return 'Đã xảy ra lỗi.';
};

const translateClerkError = (message: string): string => {
  const normalized = message.toLowerCase();

  if (
    normalized.includes('password is incorrect') ||
    normalized.includes('try again, or use another method') ||
    normalized.includes('use another method')
  ) {
    return 'Mật khẩu chưa đúng. Vui lòng thử lại hoặc chọn cách đăng nhập khác.';
  }

  if (normalized.includes('identifier not found') || normalized.includes('couldn\'t find your account')) {
    return 'Không tìm thấy tài khoản với email này.';
  }

  if (normalized.includes('too many requests')) {
    return 'Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.';
  }

  if (normalized.includes('session has expired') || normalized.includes('expired')) {
    return 'Phiên làm việc đã hết hạn. Vui lòng thử lại.';
  }

  if (normalized.includes('strategy') && normalized.includes('not')) {
    return 'Phương thức đăng nhập này hiện chưa khả dụng.';
  }

  return message;
};

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

  const switchMode = (nextMode: 'signin' | 'signup') => {
    setMode(nextMode);
    setError('');
  };

  const handleGoogleSignIn = async () => {
    if (!signIn) {
      setError('Clerk chưa sẵn sàng. Vui lòng thử lại.');
      return;
    }

    try {
      setError('');
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: redirectPath,
      });
    } catch (err) {
      const message = extractClerkErrorMessage(err);
      setError(translateClerkError(message));
    }
  };

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
          setError('Clerk vẫn đang bật xác minh khi đăng ký. Hãy tắt mục Verify at sign-up trong Clerk rồi thử lại.');
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
      const message = extractClerkErrorMessage(err);
      setError(translateClerkError(message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-xl md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Xác thực tài khoản</p>
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
            onClick={() => switchMode('signup')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          >
            Đăng ký
          </button>
          <button
            type="button"
            onClick={() => switchMode('signin')}
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

          {mode === 'signin' ? (
            <button
              type="button"
              onClick={() => router.push(`/sign-in?redirect_url=${encodeURIComponent(redirectPath)}`)}
              className="justify-self-start text-sm font-semibold text-primary underline-offset-2 hover:underline md:col-span-2"
            >
              Thử phương thức đăng nhập khác
            </button>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
          >
            {isSubmitting ? 'Đang xử lý...' : mode === 'signup' ? 'Tạo tài khoản' : 'Đăng nhập'}
            <ArrowRight size={18} />
          </button>
        </form>

        {mode === 'signin' ? (
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm font-semibold text-on-surface transition hover:bg-primary-fixed"
            >
              Đăng nhập bằng Google
            </button>
          </div>
        ) : null}

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
