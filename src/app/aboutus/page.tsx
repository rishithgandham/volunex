/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import { withPublic } from '@/auth/auth_route';
import { Kalam } from 'next/font/google';

const kalam = Kalam({ subsets: ['latin'], weight: '700' });

import React from 'react';

function About() {
  return (
    <>
      <div className="grid grid-cols-1 mt-32 ">
        <div className=" px-20 sm:px-20 md:px-20 lg:px-44">
          <p className="md:text-5xl text-3xl font-bold text-center">
            Streamlining the volunteering process,{' '}
            <p className=" inline bg-gradient-to-r from-indigo-400 via-indigo-600  to-blue-500 bg-clip-text text-transparent">
              one user at a time...
            </p>
          </p>
        </div>
        <div className="flex justify-center items-center p-20">
          <img src="/aboutussvg1.svg" />
        </div>
      </div>

      <div className="text-3xl font-bold text-center mt-20 mb-10">
        Our Mission
      </div>

      <div className="text-center text-md font-bold text-gray-500 md:px-20 lg:px-96 px-5 mb-32">
        Our mission at{' '}
        <p
          className={`text-lg inline font-semibold ${kalam.className} text-indigo-500`}
        >
          Volunex{' '}
        </p>
        is to support volunteers and organizations in their efforts to make a
        positive impact on society. We believe that documenting volunteer work
        is crucial; it recognizes individual contributions to our community
        and maximizing the effectiveness of volunteer programs. Our platform
        provides a user-friendly and comprehensive way for volunteers to
        track and verify their service hours, find volunteer opportunities, and document their
        experiences.
      </div>
    </>
  );
}

export default About;
