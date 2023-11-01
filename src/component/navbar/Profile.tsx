

//Utility
import Image from 'next/image';
import { Fragment, useState } from 'react';


export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

//Style
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '@/auth/auth_context';


//links in the profile dropdown

// auth

interface ProfileDropdownItem {
  name: string;
  link?: string;
  color?: string;
  icon: JSX.Element;
  onClick?: () => any;
}


export default function Profile( ){
  const { logOut, user } = useAuth();

  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex w-full justify-center items-center rounded-md text-sm font-semibold text-gray-900  bg-transparent   transition-all ease-in-out  hover:scale-110  md:hover:bg-slate-100 md:px-3 md:py-2">
          <p className="pr-3 md:block hidden">{user?.firstName}</p>
          <Image
            className="rounded-xl"
            src={user?.profilePicture}
            width={25}
            height={25}
            alt="hello"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="min-h-20 px-4 py-2">
              <p className="font-semibold text-xs pb-2">Signed in as:</p>
              <p className=" text-xs mb-1">{user?.email}</p>
            </div>

            <hr />

              <DropdownMenuItem link='/app/opportunities/myopportunities' name="My Events" icon={<ion-icon name="albums-outline"></ion-icon>}/>
              <DropdownMenuItem link='/app/opportunities/dashboard' name="Dashboard" icon={<ion-icon name="bar-chart-outline"></ion-icon>}/>
              <DropdownMenuItem link='/app/portfolio/' name="My Portfolio" icon={<ion-icon name="person-outline"></ion-icon>}/>

              
              <hr/>
              <DropdownMenuItem onClick={logOut} color="text-red-500"name="Log Out" icon={<ion-icon name="exit-outline"></ion-icon>}/>
          </div>        
          </Menu.Items>
      </Transition>
    </Menu>
  );
}

function DropdownMenuItem({
  name,
  color,
  link,
  icon,
  onClick
}: ProfileDropdownItem) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={link}
          onClick={onClick}
          className={classNames(
            active ? 'bg-gray-100' : 'bg-white',
            `block px-4 py-2 text-xs font-semibold ${color} flex justify-between items-center`
          )}
        >
          <p>{name}</p>
          {icon}

        </a>
      )}
    </Menu.Item>
  );
}