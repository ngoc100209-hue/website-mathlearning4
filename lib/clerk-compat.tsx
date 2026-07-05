'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const SESSION_KEY = 'mathsign-clerk-session';

type ClerkUser = {
  id: string;
  emailAddress?: string;
  firstName?: string;
  unsafeMetadata?: Record<string, unknown>;
};

type ClerkUserState = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: ClerkUser | null;
};

const ClerkContext = createContext<{ signOut: (callback?: () => void) => Promise<void> } | null>(null);

function readSession(): ClerkUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user: ClerkUser | null) {
  if (typeof window === 'undefined') return;
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY);
    document.cookie = 'mathsign-clerk-session=; Path=/; Max-Age=0';
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  document.cookie = `mathsign-clerk-session=${encodeURIComponent(JSON.stringify(user))}; Path=/; Max-Age=31536000`;
}

export function ClerkProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({
    signOut: async (callback?: () => void) => {
      writeSession(null);
      callback?.();
    },
  }), []);

  return <ClerkContext.Provider value={value}>{children}</ClerkContext.Provider>;
}

export function useUser() {
  const [state, setState] = useState<ClerkUserState>({ isLoaded: false, isSignedIn: false, user: null });

  useEffect(() => {
    setState({ isLoaded: true, isSignedIn: Boolean(readSession()), user: readSession() });
  }, []);

  return state;
}

export function useClerk() {
  const context = useContext(ClerkContext);
  return {
    signOut: context?.signOut ?? (async () => writeSession(null)),
  };
}

export function useSignIn() {
  return {
    signIn: {
      create: async ({ identifier, password }: { identifier: string; password: string }) => {
        const user = readSession();
        if (user?.emailAddress === identifier) {
          writeSession(user);
          return { status: 'complete', createdSessionId: 'local-session' };
        }

        const stored = window.localStorage.getItem('mathsign-auth-users');
        const users = stored ? JSON.parse(stored) : [];
        const match = users.find((item: { email: string; password: string }) => item.email === identifier && item.password === password);
        if (match) {
          const clerkUser = {
            id: `local-${Date.now()}`,
            emailAddress: match.email,
            firstName: match.fullName || 'Học sinh',
            unsafeMetadata: { fullName: match.fullName, age: match.age, location: match.location },
          };
          writeSession(clerkUser);
          return { status: 'complete', createdSessionId: 'local-session' };
        }

        throw new Error('Email hoặc mật khẩu không đúng.');
      },
    },
    setActive: async () => undefined,
  };
}

export function useSignUp() {
  return {
    signUp: {
      create: async ({ emailAddress, password, unsafeMetadata }: { emailAddress: string; password: string; unsafeMetadata?: Record<string, unknown> }) => {
        const stored = window.localStorage.getItem('mathsign-auth-users');
        const users = stored ? JSON.parse(stored) : [];
        const nextUsers = [...users.filter((item: { email: string }) => item.email !== emailAddress), { email: emailAddress, password, fullName: unsafeMetadata?.fullName, age: unsafeMetadata?.age, location: unsafeMetadata?.location }];
        window.localStorage.setItem('mathsign-auth-users', JSON.stringify(nextUsers));
        const clerkUser = {
          id: `local-${Date.now()}`,
          emailAddress,
          firstName: (unsafeMetadata?.fullName as string) || 'Học sinh',
          unsafeMetadata,
        };
        writeSession(clerkUser);
        return { status: 'complete', createdSessionId: 'local-session' };
      },
      prepareEmailAddressVerification: async () => undefined,
    },
    setActive: async () => undefined,
  };
}

export function createRouteMatcher(_routes: string[] = []) {
  return (_req: unknown) => true;
}

export function clerkMiddleware(handler: (auth: { protect: () => Promise<void> | void }, req: unknown) => unknown) {
  return async (auth: { protect: () => Promise<void> | void }, req: unknown) => handler(auth, req);
}
