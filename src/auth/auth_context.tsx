'use client';
import '@/firebase/firebase';

import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from './auth_service';
import {
  User,
  UserCredential,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './auth_service';
import { useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';

export type AuthContextType = {
  user: DocumentData | undefined;
  providerUser: User | null | undefined;
  loginWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  fetchAndSetAppUser: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [providerUser, setProviderUser] = useState<User | null | undefined>();
  const [user, setUser] = useState<DocumentData | undefined>();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoading(true);
      console.log(auth.currentUser);
      setProviderUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (providerUser) {
      fetchAndSetAppUser();
    } 
  }, [providerUser])

  const fetchAndSetAppUser = async () => {
    // await new Promise(res => setTimeout(res, 5000));
    const user = await authService.getAppUser();
    setUser(user);
  };

  const loginWithGoogle = async () => {
    console.log('google log in');
    await authService.loginWithGoogle();
    router.push('/app/dashboard')
  };

  const logOut = async () => {
    setUser(undefined);
    await authService.logOut();
    router.push('/auth/login');
  };
  

  return (
    <>
      {!loading ? (
        <AuthContext.Provider
          value={{ providerUser, user, loginWithGoogle, logOut, fetchAndSetAppUser }}
        >
          {children}
        </AuthContext.Provider>
      ) : (
        <>Loading</>
      )}
    </>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
