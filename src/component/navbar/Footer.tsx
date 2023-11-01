'use client';

import { useAuth } from '@/auth/auth_context';
import { Kalam } from 'next/font/google';
import React from 'react';
import { toast } from 'react-toastify';

const kalam = Kalam({ subsets: ['latin'], weight: '700' });

export default function Footer() {
  const auth = useAuth();
  return (
    <footer className="w-full bg-white  p-5 text-black  border-t-2 border-indigo-900">
      <p className={`${kalam.className} text-3xl font-bold text-center`}>
        Volunex
      </p>
      <div className=" flex justify-center items-center mt-3">
        <div className="grid grid-cols-3">
          <a className='mx-2' href="http://">
            <ion-icon name="logo-github"></ion-icon>
          </a>

          <button className='mx-2' onClick={() => toast('Feature not available yet', {

          })}>
            <ion-icon name="logo-instagram"></ion-icon>
          </button>
          <a className='mx-2' href="mailto:rishith.gandham@gmail.com">
            <ion-icon name="mail-outline"></ion-icon>
          </a>
        </div>
      </div>

      <p className="text-center text-xs mt-3">© 2023 All rights reserved.</p>
    </footer>
  );
}
