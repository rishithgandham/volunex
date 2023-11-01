/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useOpportunityService } from '@/opportunity/oppurtunity_service';
import { withProtected } from '@/auth/auth_route';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@headlessui/react';
import CreateModal from '@/component/CreateOpportunity';
import Link from 'next/link';




function MyOpportunities() {
  const { fetchUserOpportunities } = useOpportunityService();

  const [userOpportunities, setUserOpportunities] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();

  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    
    getUserOpportunities();
  }, []);


  const getUserOpportunities = async () => {
    const data = await fetchUserOpportunities();
    setUserOpportunities(data);
  };


  // useEffect(() => {
  //   console.log(userOpportunities);
  // }, [userOpportunities]);

  return (
    <>
      <div className="flex-col  items-center justify-center h-10 text-center  m-10 p-10  ">
        <p className="lg:text-4xl text-2xl font-bold __className_5d885b">
          My Volunteering Events
        </p>
      </div>

      <div className="flex w-full justify-center p-10">
        <ul className="lg:w-1/2 md:w-3/4 w-full m-2">
          {userOpportunities?.map((e, i) => {
            const event = e.data();
            const eventDate: Date = event.eventDate.toDate();
            const date = `${eventDate.getMonth()}/${eventDate.getUTCDate()}/${eventDate.getUTCFullYear()}`;
            const toRegularTime = (hours: number) => {
              return hours > 12 ? hours - 12 : hours;
            };
            const time = `${toRegularTime(
              eventDate.getHours()
            )}:${eventDate.getMinutes()}`;

            const dateTime = date + ' ' + time;
            return (
              <OpportunityView event={event} key={i} dateTime={dateTime} id={e.id}  />
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center font-bold text-3xl mb-20">
        <button onClick={() => setCreateOpen(true)} className="hover:scale-110 transition-all ease-in-out shadow w-10 h-10 bg-indigo-600 text-white font-bold  rounded-xl flex items-center justify-center">
          <ion-icon name="add-outline" size="small"></ion-icon>
        </button>
      </div>

      <CreateModal open={createOpen} setOpen={setCreateOpen} getOpportunities={getUserOpportunities} ></CreateModal>
    </>
  );
}

export default withProtected(MyOpportunities);

function OpportunityView({ dateTime, event, id }: any) {
  return (
    <Link href={`/app/opportunities/myopportunities/${id}`} className="grid relative md:grid-cols-2 grid-cols-1 mb-10 rounded-xl border-black border hover:scale-110 hover:brightness-75 transition-all ease-in-out">
      <div className="p-5 h-full ">
        <p className="text-lg font-bold mb-2" >{event.eventName}</p>
        <p className="text-xs font-bold text-slate-600">
          {event.eventDescription.slice(0, 200).concat("...")}
        </p>
      </div>
      <div className="p-5 mb-6 h-full text-end">
        <p className=" font-bold  text-xs">{dateTime}</p>
        <p className="text-xs font-bold text-slate-600">
          {`${event.eventAdress}, ${event.eventCity}, ${event.eventState}`}
        </p>
      </div>
      {/* <div className="absolute  bottom-0.5 right-3.5">
        <button className="w-7 h-7 flex justify-center items-center bg-indigo-500 text-white text-xs rounded-md m-1 hover:scale-110 hover:bg-indigo-500 transition-all ease-in-out">
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
        
        
      </div> */}
    </Link>
  );
}
