'use client';
import React, { Component } from 'react';
import { AuthContextType, useAuth } from '@/auth/auth_context';
import { withPublic } from '@/auth/auth_route';

function Login({ auth }: { auth: AuthContextType }) {
  const { user, loginWithGoogle } = auth;

  return (
    <>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
        <button onClick={loginWithGoogle} type="button" className="text-white w-full flex justify-center items-center gap-x-5  bg-indigo-500 p-2 rounded-xl shadow-xl font-bold text-xs mr-2 mb-2 hover:scale-110 transition-all ease-in-out">Sign up with Google<ion-icon name="logo-google"></ion-icon></button>

        
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className=" md:w-2/3 xl:w-1/3 w-full  min-h-fit  rounded-lg  p-10 flex-col items-center  ">
          <div className=" font-bold pb-5 text-2xl  text-center">Login</div>
          <div className="flex justify-between px-20">
            <button onClick={loginWithGoogle} className="bg-slate-200 rounded-xl shadow-xl h-10 w-10 flex justify-center items-center"><ion-icon name="logo-google"></ion-icon></button>
            <button className="bg-slate-200 rounded-xl shadow-xl h-10 w-10 flex justify-center items-center"><ion-icon name="logo-github"></ion-icon></button>
            <button className="bg-slate-200 rounded-xl shadow-xl h-10 w-10 flex justify-center items-center"><ion-icon name="logo-facebook"></ion-icon></button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default withPublic(Login);
