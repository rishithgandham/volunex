/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAuth } from '@/auth/auth_context';
import { withProtected, withPublic } from '@/auth/auth_route';
import { useOpportunityService } from '@/opportunity/oppurtunity_service';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function EntryViewPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<DocumentData | undefined>();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    console.log(params.id);
    const userR = await getRequestUser(params.id);
    setUser(userR.data());
  }
  const { getRequestUser } = useOpportunityService();

  return (
    <>
      <div className="flex-col  items-center justify-center h-10 text-center  m-10 p-10 ">
        <p className="lg:text-4xl text-2xl font-extrabold">
          {user?.firstName}&apos;s Portfolio
        </p>
      </div>

      <div className="flex-col justify-center items-center md:mx-20 lg:mx-72 m-10 p-2 rounded-xl  ">
        <ul role="list" className="">
          {user?.volunteeredOpportunities.map((i: any, e: any) => {
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

export default withPublic(EntryViewPage);
