/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { AuthContextType, useAuth } from '@/auth/auth_context';
import { withProtected } from '@/auth/auth_route';
import { useOpportunityService } from '@/opportunity/oppurtunity_service';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Page({ auth }: { auth: AuthContextType }) {
  const { fetchAndSetAppUser } = useAuth();

  useEffect(() => {
    // fetchAndSetAppUser()
  });
  console.log(auth.user);
  return (
    <>
      <div className="h-10 text-center  m-10 p-10 sm:mb-20 mb-52">
        <div className="flex  items-center justify-center  ">
          <p className="lg:text-4xl text-2xl font-extrabold mr-2">
            {auth.user?.firstName}&apos;s Portfolio
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/app/portfolio/${auth.providerUser?.uid}`
              );
              toast('Share link copied to clipboard!')
            }}
          >
            <ion-icon name="share-outline"></ion-icon>
          </button>
        </div>

        <p className="text-gray-500 text-sm font-bold">
          This is your portfolio, and where you will find which events you
          requested credits for, their status, information about your request,
          the event, all in a neat manner and sharable to others
        </p>
      </div>

      <div className="flex-col justify-center items-center md:mx-20 lg:mx-72 m-10 p-2 rounded-xl  ">
        <ul role="list" className="">
          {auth.user?.volunteeredOpportunities.map((i: any, e: any) => {
            return <PortfolioView key={e} refer={i} />;
          })}
        </ul>
      </div>
    </>
  );
}

const PortfolioView = ({ refer }: { refer: any }) => {
  const [opportunity, setOpportunity] = useState<DocumentData | undefined>();

  useEffect(() => {
    async function getOpportunities() {
      const opportunity = await getOpportunity(refer.opportunityId);
      setOpportunity(opportunity.data());
    }

    getOpportunities();
  }, []);

  const { getOpportunity } = useOpportunityService();

  return (
    <>
      <li className="grid relative md:grid-cols-2 bg-white md:divide-x divide-y grid-cols-1 mb-10 rounded-xl border-black border">
        <div className="p-5 h-full">
          <p className="text-lg font-bold mb-2">{opportunity?.eventName}</p>
          <p className="text-xs font-bold text-slate-600">
            {opportunity?.eventDescription}
          </p>
          <p className="text-xs font-bold text-slate-600 mt-3">
            {`${opportunity?.eventAdress}, ${opportunity?.eventCity}, ${opportunity?.eventState}`}
          </p>
          <p className="text-md font-bold mt-4"> Contact Information: </p>
          <p className="text-xs font-bold text-slate-600">
            Email: {opportunity?.contactEmail}
          </p>
          <p className="text-xs font-bold text-slate-600">
            Phone: {opportunity?.contactNumber}
          </p>
        </div>
        <div className="p-5 mb-6 h-full ">
          <p className="text-lg font-bold mb-2 ">Volunteer Reflection</p>

          <p className=" font-bold  text-xs text-slate-600">
            {' '}
            Date of Service:{' '}
            {`${refer?.dateOfService.toDate().getMonth()}/${refer?.dateOfService
              .toDate()
              .getUTCDate()}/${refer?.dateOfService.toDate().getUTCFullYear()}`}
          </p>

          <p className="text-md font-bold mt-4">Reflection:</p>
          <p className="text-xs font-bold text-slate-600 break-words">
            {refer?.volunteerReflection}
          </p>
          <p className="text-xs font-bold text-slate-600 mt-3 ">
            Hours: {refer?.hoursVolunteered}
          </p>
        </div>

        <div className="absolute bottom-1 right-1 px-2 py-1">
          {refer.verified ? (
            <p className="text-xs font-bold text-green-900 mt-3">Verified</p>
          ) : (
            <p className="text-xs font-bold text-gray-600 mt-3">
              Pending Verification...
            </p>
          )}
        </div>
      </li>
    </>
  );
};

export default withProtected(Page);
