'use client';

import { useAuth } from '@/auth/auth_context';
import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import Profile from './Profile';
import { Kalam } from 'next/font/google';

let tempuser = {
  picture: 'https://picsum.photos/100',
  first: 'Rishith',
  last: 'Gandham',
  email: 'rishith.gandham@gmail.com',
};

const kalam = Kalam({ subsets: ['latin'], weight: '700' });

export function PublicNavbar() {
  return (
    <>
      <nav className="h-14 flex justify-between items-center md:px-10 px-5">
        <div className="w-1/6 ">
          <a
            href="/"
            className={`text-lg font-semibold ${kalam.className} text-indigo-500`}
          >
            Volunex
          </a>
        </div>
        <div className="flex p-2 items-center justify-end w-5/6 bg-transparent ">
          <NavbarLink href="/auth/login" name="Sign In" />
          <NavbarLink href="/aboutus" name="About us" />

          <Link
            href="/auth/login"
            className="font-semibold text-xs w-28 flex justify-center px-3 py-2 bg-indigo-500 text-white rounded-xl transition-all ease-in-out hover:scale-110"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </>
  );
}

export function PrivateNavbar() {
  return (
    <>
      <Disclosure as="nav" className="bg-transparent text-black">
        {({ open }) => (
          <>
            <div className="h-14 flex justify-between items-center px-10">
              <div className="w-1/3 hidden md:block">
                <a
                  href="/app/"
                  className={`text-lg font-semibold ${kalam.className} text-indigo-500`}
                >
                  Volunex
                </a>
              </div>

              <div className=" hidden p-2 items-center justify-center w-1/3 md:flex bg-transparent">
                <NavbarLink href="/app/dashboard" name="Dashboard" />
                <NavbarLink href="/app/portfolio" name="Portfolio" />
                <NavbarLink href="/app/opportunities" name="Find" />
              </div>

              <div className="flex  justify-start items-center w-1/2 md:hidden">
                <Disclosure.Button>
                  <ion-icon name="menu-outline"></ion-icon>
                </Disclosure.Button>
              </div>

              <div className="flex justify-end w-1/2 md:w-1/3  ">
                <Profile />
              </div>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-7 pb-3 pt-2">
                  <DisclosureLink href="/app/dashboard" name="Dashboard" />
                  <DisclosureLink href="/app/portfolio" name="Portfolio" />
                  <DisclosureLink href="/app/opportunities" name="Find" />
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default function Navbar() {
  const { providerUser } = useAuth();
  return <>{providerUser ? <PrivateNavbar /> : <PublicNavbar />}</>;
}

export interface NavigationLink {
  icon?: JSX.Element;
  href: string;
  name: string;
}

function NavbarLink({ icon, href, name }: NavigationLink) {
  return (
    <Link
      href={href}
      className="md:flex p-2 hidden  rounded-xl  items-center transition-all ease-in-out  m-5 hover:scale-110 hover:translate-y-1   xl:mx-10"
    >
      {icon && <p className="mr-3">{icon}</p>}
      <p className="font-semibold text-xs">{name}</p>
    </Link>
  );
}

function DisclosureLink({ icon, href, name }: NavigationLink) {
  return (
    <Disclosure.Button
      href={href}
      as="a"
      className={
        'flex justify-between items-center rounded-md px-3 py-2 text-base font-medium hover:bg-slate-100'
      }
    >
      <p className="text-sm">{name}</p>
    </Disclosure.Button>
  );
}

const LogoSvg = ({ w, h }: any) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 278 326"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 94L2 243"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M2.07867 242.855L100.079 323.855"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M116 9L2 94"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M157 2L43 87"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M215 233L100 324"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M272.642 87.0241L158 2"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M275.044 226.966L156.044 320.966"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M274.805 87.3966L275.805 225.397"
        stroke="#A92966"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M214.805 163.397C214.805 204.229 181.039 237.397 139.305 237.397C97.57 237.397 63.8045 204.229 63.8045 163.397C63.8045 122.564 97.57 89.3966 139.305 89.3966C181.039 89.3966 214.805 122.564 214.805 163.397Z"
        stroke="black"
        stroke-width="4"
      />
    </svg>
  );
};
