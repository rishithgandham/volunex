/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import React, { useEffect, useState } from 'react';
import { AuthContextType, useAuth } from '@/auth/auth_context';
import { withProtected } from '@/auth/auth_route';
import {
  DocumentData,
  QueryDocumentSnapshot,
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

import Image from 'next/image';
import { useOpportunityService } from '@/opportunity/oppurtunity_service';
import { Dialog } from '@headlessui/react';
import { string, z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Page({ auth }: { auth: AuthContextType }) {
  const { fetchOpportunities, getRequestUser } = useOpportunityService();

  const [opportunities, setOpportunities] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();
  const [currentModalOpportunity, setCurrentModalOpportunity] = useState<
    | {
        event: DocumentData;
        id: string;
      }
    | undefined
  >();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalTrigger = () => setModalOpen(!modalOpen);

  useEffect(() => {
    const getOpp = async () => {
      const data = await fetchOpportunities();
      setOpportunities(data);
    };
    getOpp();
  }, []);

  return (
    <>
      <div className="flex-col  items-center justify-center h-10 text-center  m-10 p-10 mb-20 ">
        <p className="lg:text-4xl text-2xl font-extrabold">
          Find Volunteering Opportunities
        </p>
      </div>

      {/* <div className='  grid grid-cols-6'>
        <div className="col-span-4 px-10 flex-justify-center">
        <input
            type="search"
            id="default-search"
            className="block  w-full py-3 px-5 text-sm border border-black rounded-xl shadow-md"
            placeholder="Search For Events In Your Specific Area."
          ></input>
        </div> */}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:mx-20 p-10 ">
        {opportunities?.map((e, i) => {
          const event = e.data();

          const eventDate: Date = event.eventDate.toDate();
          const startDate: Date = event.eventStartTime.toDate();
          const endDate: Date = event.eventEndTime.toDate();
          const date = `${eventDate.getMonth()}/${eventDate.getUTCDate()}/${eventDate.getUTCFullYear()}`;
          const toRegularTime = (hours: number) => {
            return hours > 12 ? hours - 12 : hours;
          };
          const startTime = `${toRegularTime(
            startDate.getHours()
          )}:${startDate.getMinutes()}`;
          const endTime = `${toRegularTime(
            endDate.getHours()
          )}:${endDate.getMinutes()}`;
          if (event.userId == auth.providerUser?.uid) {
            return;
          }
          return (
            <>
              <a
                key={i}
                className="group relative border border-black bg-white rounded-xl text-left shadow-xl hover:scale-[102%] transition-all ease-in-out"
              >
                <div className="mx-4 my-4 ">
                  <p className="text-md font-bold mb-2">{event.eventName}</p>
                  <p className="text-sm font-bold text-slate-600 mb-2 flex items-center">
                    {event.eventCity + ', ' + event.eventState}
                  </p>
                  <p className="text-sm font-bold text-slate-600 mb-2 flex items-center">
                    {event.eventDescription}
                  </p>
                  <p className="text-md font-extrabold mb-2 flex items-center">
                    Dates: 
                  </p>
                  <p className="text-xs font-extrabold text-slate-600 mb-2 flex items-center">
                    Date: {date}
                  </p>
                  <p className="text-xs font-extrabold text-slate-600 mb-2 flex items-center">
                    Start time: {startTime}
                  </p>
                  <p className="text-xs font-extrabold text-slate-600 mb-2 flex items-center">
                    End time: {endTime}
                  </p>
                  <p className="text-md font-extrabold mb-2 flex items-center">
                    Contact Information: 
                  </p>
                  <p className="text-xs font-extrabold text-slate-600 mb-2 flex items-center">
                    Phone/Email: {event.contactNumber}/<a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a>
                    
                  </p>
                  <p className="text-xs font-extrabold text-slate-600 mb-2 flex items-center">
                    Adress: {event.eventAdress}
                    
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentModalOpportunity({
                      event,
                      id: e.id,
                    });
                    setModalOpen(true);
                  }}
                  className="absolute bottom-1.5 right-3 p-2 m-2 bg-indigo-500 rounded-xl text-white text-xs font-semibold hover:scale-110 transition-all ease-in-out"
                >
                  Add +
                </button>
              </a>
            </>
          );
        })}

        <RequestCreditModal
          current={currentModalOpportunity}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </div>
    </>
  );
}

const RequestCreditModal = ({
  current,
  open,
  setOpen,
}: {
  current: { event: DocumentData; id: String } | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const {fetchAndSetAppUser} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<RequestCreditSchemaType>({
    resolver: zodResolver(requestCreditSchema),
  });

  const router = useRouter();

  const { userRequestCredit } = useOpportunityService();

  const onSubmit: SubmitHandler<RequestCreditSchemaType> = async data => {
    await userRequestCredit(data, current?.id);
    toast('Event Added to Portfolio...');
    fetchAndSetAppUser();
    return router.push('/app/portfolio');
  };

  return (
    <>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="  border-2 border-black  w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-bold leading-6 text-gray-900"
              >
                Request Credits for {current?.event.eventName}
              </Dialog.Title>
              <div className="my-2">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  To request credits for {current?.event.eventName}, You must
                  fill out a short reflection of your work, which will be added
                  to your portfolio along with being sent to the event organizer
                  for verification of credits.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bg-transparent mt-4">
                    <label className="block  mb-2 text-xs font-bold  ">
                      Date of Service
                    </label>
                    <input
                      className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
                      {...register('dateOfService', {
                        setValueAs: v => new Date(v),
                      })}
                      type="date"
                    />
                    <span className="text-red-400 text-xs pr-1 font-bold mb-3">
                      {errors.dateOfService?.message}
                    </span>
                  </div>
                  <div className="bg-transparent">
                    <label className="block  mb-2 text-xs font-bold  ">
                      Hours Volunteered
                    </label>
                    <input
                      className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
                      {...register('hoursVolunteered', {
                        setValueAs: v => v / 1,
                      })}
                      type="number"
                    />
                    <span className="text-red-400 text-xs pr-1 font-bold mb-3">
                      {errors.hoursVolunteered?.message}
                    </span>
                  </div>
                  <div className="bg-transparent">
                    <label className="block  mb-2 text-xs font-bold  ">
                      Volunteer Reflection
                      <p className="italic text-[10px] text-gray-500">
                        Write some sentences about what activities you
                        participated in during this event, and your reflection
                        on them.
                      </p>
                    </label>
                    <textarea
                      rows={8}
                      className=" border  border-slate-400 text-xs h-40 rounded-lg  block w-full p-2.5 "
                      {...register('volunteerReflection')}
                    />
                    <span className="text-red-400 text-xs pr-1 font-bold mb-3">
                      {errors.volunteerReflection?.message}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="flex justify-between items-center rounded-md 
                   bg-indigo-500 px-4 py-2 text-xs font-semibold
                    text-white hover:bg-indigo-600 hover:scale-110 
                    transition-all ease-in-out"
                    >
                      <div>Request +</div>
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const requestCreditSchema = z.object({
  dateOfService: z.date(),
  hoursVolunteered: z.number().min(0, 'hours volunteered required'),
  volunteerReflection: z.string().min(0, 'reflection required'),
});

export type RequestCreditSchemaType = z.infer<typeof requestCreditSchema>;

export default withProtected(Page);
