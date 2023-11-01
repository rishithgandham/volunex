/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { AuthContextType, useAuth } from '@/auth/auth_context';
import { withProtected } from '@/auth/auth_route';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
} from 'firebase/firestore';
import { getUsers } from '@/db';
import { db } from '@/firebase/firebase';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  VolunteerFormSchema,
  volunteerSchema,
} from '@/form_schemas/volunteer_app_formschema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOpportunityService } from '@/opportunity/oppurtunity_service';
import Link from 'next/link';

function hourSum(volunteeredEvents: any) {
  let sum = 0;

  volunteeredEvents.forEach((i: any) => {
    console.log(i);
    sum = sum + i.hoursVolunteered;
  });
  return sum;
}

function Page({ auth }: { auth: AuthContextType }) {
  const { logOut } = auth;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<VolunteerFormSchema>({
    resolver: zodResolver(volunteerSchema),
  });

  const [hours, setHours] = useState(0);

  useEffect(() => {
    setHours(0);
    auth.user?.volunteeredOpportunities.map((i: any, e: any) => {
      console.log(i.hoursVolunteered);
      setHours(hrs => hrs + i.hoursVolunteered);
    });
  }, [auth.user]);

  const onSubmit: SubmitHandler<VolunteerFormSchema> = data => {
    console.log(data, errors);
  };

  return (
    <>
      <div className="text-center  mt-32">
        <p className="lg:text-4xl text-4xl font-extrabold t">
          Hey {auth.user?.firstName},
        </p>
        <p className="text-2xl font-bold ">
          you have {hours} hours of volunteering logged..
        </p>
      </div>

      <div className="relative  justify-center md:px-20 mt-14 hidden sm:flex">
        <table className="w-1/2  text-sm text-left border-indigo-500 border-2 rounded-xl">
          <thead className="text-xs  uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event Name
              </th>
              <th scope="col" className="px-6 py-3">
                Service Date
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Reflection
              </th> */}
              <th scope="col" className="px-6 py-3">
                Hours
              </th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {auth.user?.volunteeredOpportunities.map((i: any, e: any) => {
              return <TableView key={e} refer={i} />;
            })}
          </tbody>
        </table>
      </div>

      {hours == 0 ? (
        <>
          <p className="text-lg font-bold text-center mt-20 mb-5">
            Looks like you have no volunteer hours logged, visit{' '}
            <Link className="underline italic"href={'/app/opportunities'}>the find page</Link>
          </p>
          <div className="flex justify-center items-center ">
            <img
              src="/dashboard.svg"
              alt="dash image"
              className=" w-[200px] h-[200 px]"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const TableView = ({ refer }: { refer: any }) => {
  const DOS = refer.dateOfService.toDate();

  const date = `${DOS.getMonth()}/${DOS.getUTCDate()}/${DOS.getUTCFullYear()}`;

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
      <tr className="bg-white border-b  hover:bg-gray-50 ">
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {opportunity?.eventName}
        </th>
        <td className="px-6 py-4">{date}</td>
        {/* <td className="px-6 py-4">{refer.volunteerReflection.slice(0, 5).concat('...')}</td> */}
        <td className="px-6 py-4">{refer.hoursVolunteered}</td>
        <td className="px-6 py-4 ">
          {refer.verified ? 'Verified' : 'Pending'}
        </td>
      </tr>
    </>
  );
};

export default withProtected(Page);
