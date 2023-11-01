'use client';

import { withProtected } from '@/auth/auth_route';
import { useOpportunityService } from '@/opportunity/oppurtunity_service';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useReducer, useState } from 'react';
import { date } from 'zod';

function Page({ params }: { params: { id: string } }) {
  const { getOpportunity, getRequestUser } = useOpportunityService();
  const [opportunity, setOpportunity] = useState<DocumentData | undefined>();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [len, setLen] = useState<number>(0);

  async function fetchOpportunity() {
    const opp = await getOpportunity(params.id);
    console.log('hello')
    setOpportunity(opp.data());
  }

  useEffect(() => {
    fetchOpportunity();
  }, []);
  // useEffect(() => {

  //   console.log(opportunity?.eventVolunteers.entries());

  // }, [opportunity]);

  return (
    <>
      <div className="flex-col  items-center justify-center h-10 text-center  m-10 p-10  ">
        <p className="lg:text-4xl text-2xl font-bold __className_5d885b">
          {opportunity?.eventName}
        </p>
      </div>
      <p className="text-lg text-center font-bold mb-5">
        Requests For Credits: {len}
      </p>
      <div className="flex w-full justify-center">
        <ul className="lg:w-2/3 md:w-3/4 sm:w-full m-5 rounded-xl border border-black divide-x">
          {opportunity?.eventVolunteers.map((i: any, e: any) => {
            // setLen(len + 1);

            return (
              <RequestUserListItem
                key={Math.floor(Math.random() * 10000)}
                request={i}
                id={params.id}
                userId={i.volunteerUserId}
                getMyOpportunities={fetchOpportunity}
              />
            );
          })}
        </ul>
      </div>
      {len == 0 ? (
        <p className="text-md mt-4 font-bold text-center">
          No Requests For Credits
        </p>
      ) : (
        <></>
      )}
    </>
  );
}

function RequestUserListItem({ request, userId, id, getMyOpportunities }: any) {
  const { getRequestUser, acceptCredit } = useOpportunityService();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getUser() {
      const user = await getRequestUser(userId);
      setUser(user.data());
    }
    getUser();
  }, []);

  function acceptRequest() {
    acceptCredit(request.volunteerUserId, id);
    getMyOpportunities();
  }
  return (
    <>
      <li className="grid lg:grid-cols-2 grid-cols-1 relative    border-b-black lg:divide-x divide-y">
        <div className="p-5 ">
          <p className=" font-bold  text-md ">{user?.firstName}</p>
          <p className=" font-bold  text-xs text-slate-600">
            Date of Service:{' '}
            {`${request?.dateOfService
              .toDate()
              .getMonth()}/${request?.dateOfService
              .toDate()
              .getUTCDate()}/${request?.dateOfService
              .toDate()
              .getUTCFullYear()}`}
          </p>
          <p className="text-xs font-bold text-slate-600">
            Hours: {request?.hoursVolunteered}
          </p>
          {request.validated ? (
            <p className="text-sm font-bold">Validated</p>
          ) : (
            <button
              onClick={acceptRequest}
              className="px-4 py-2 mt-2 text-xs font-semibold text-white rounded-xl bg-indigo-500"
            >
              <ion-icon name="checkmark-outline"></ion-icon>
            </button>
            
          )}
        </div>
        <div className="flex-col justify-center items-center p-5">
          <p className=" font-bold  text-md ">Volunteer Reflection</p>
          <p className="text-[10px] mt-3 font-bold text-slate-600">
            {request?.volunteerReflection}
          </p>
        </div>
        <div className="absolute bottom-1.5 left-0.5 flex justify-center items-center ">
          
        </div>
      </li>
    </>
  );
}

export default withProtected(Page);
