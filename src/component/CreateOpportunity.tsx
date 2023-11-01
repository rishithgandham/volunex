import { useOpportunityService } from "@/opportunity/oppurtunity_service";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export const opportunitySchema = z
  .object({
    eventName: z.string().min(1, 'required'),
    eventDescription: z.string().min(1, 'required'),
    eventStartTime: z
      .date()
      .min(new Date(), 'date required / cannot be earlier than today'),
    eventEndTime: z
      .date()
      .min(new Date(), 'date required / cannot be earlier than today'),
    eventDate: z
      .date()
      .min(new Date(), 'date required / cannot be earlier than today'),
    eventState: z.string().min(1, 'required state'),
    eventCity: z.string().min(1, 'required city'),
    eventAdress: z.string().min(1, 'required adress'),
    contactNumber: z.string().min(1, 'required number'),
    contactEmail: z.string().email("this is not a valid email"),
  })
  .refine(data => data.eventEndTime > data.eventStartTime, {
    message: 'End date cannot be earlier than start date.',
    path: ['eventEndTime'],
  });

export type OpportunitySchema = z.infer<typeof opportunitySchema>;

export default function CreateModal({
  open,
  setOpen,
  getOpportunities
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getOpportunities: any
})  {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<OpportunitySchema>({
    resolver: zodResolver(opportunitySchema),
  });

  const router = useRouter();

  const { createOpportunity } = useOpportunityService()

  const onSubmit: SubmitHandler<OpportunitySchema> = async data => {
     createOpportunity(data);
     getOpportunities();
     setOpen(false)
     toast('Event Created');

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
        <div className="fixed inset-0  flex justify-center items-center">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Dialog.Panel className="  border-2 border-black  w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
              <div className="overflow-y-auto max-h-[75vh] p-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Create a Volunteering Event
                </Dialog.Title>
                <div className="my-2">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    Create your own volunteering event, including the name,
                    description, dates, and contact information. The event
                    created will be shown to many volunteers who can request the
                    verification of credits from you.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="text-md font-bold flex justify-between items-center my-4">Information <ion-icon name="information-circle-outline"></ion-icon></div>

                    <FormInput
                      register={register}
                      error={errors.eventName?.message}
                      name="Event Name"
                      registerName="eventName"
                    />

                    <FormInput
                      register={register}
                      error={errors.eventDescription?.message}
                      name="Event Description"
                      registerName="eventDescription"
                      textArea
                    />

                    {/*  */}
                    
                  <div className="text-md font-bold flex justify-between items-center my-4">Dates/Times<ion-icon name="calendar-outline"></ion-icon></div>
                    <div className="bg-transparent">
                      <label className="block  mb-2 text-xs font-bold  ">
                        Event Date
                      </label>
                      <input
                        className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
                        {...register('eventDate', {
                          setValueAs: value => new Date(value),
                        })}
                        type="datetime-local"
                      />
                      <span className="text-red-400 text-xs pr-1 font-bold mb-3">
                        {errors.eventDate?.message}
                      </span>
                    </div>

                    {/*  */}
                    <div className="bg-transparent">
                      <label className="block  mb-2 text-xs font-bold  ">
                        Event Start Time
                      </label>
                      <input
                        className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
                        {...register('eventStartTime', {
                          setValueAs: value => new Date(value),
                        })}
                        type="datetime-local"
                      />
                      <span className="text-red-400 text-xs pr-1 font-bold mb-3">
                        {errors.eventStartTime?.message}
                      </span>
                    </div>

                    {/*  */}
                    <div className="bg-transparent">
                      <label className="block  mb-2 text-xs font-bold  ">
                        Event End Time
                      </label>
                      <input
                        className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
                        {...register('eventEndTime', {
                          setValueAs: value => new Date(value),
                        })}
                        type="datetime-local"
                      />
                      <span className="text-red-400 text-xs pr-1 font-bold mb-3">
                        {errors.eventEndTime?.message}
                      </span>
                    </div>

                    {/*  */}
                    <div className="text-md font-bold flex justify-between items-center my-4">
                      Location <ion-icon name="pin-outline"></ion-icon>
                    </div>
                    <FormInput
                      register={register}
                      error={errors.eventState?.message}
                      name="Event State"
                      registerName="eventState"
                    />

                    {/*  */}

                    <FormInput
                      register={register}
                      error={errors.eventCity?.message}
                      name="Event City"
                      registerName="eventCity"
                    />

                    {/*  */}

                    <FormInput
                      register={register}
                      error={errors.eventCity?.message}
                      name="Event Adress"
                      registerName="eventAdress"
                    />

                    {/*  */}
                      <div className="text-md font-bold flex justify-between items-center my-4">Contact Information<ion-icon name="mail-outline"></ion-icon></div>
                    <FormInput
                      register={register}
                      error={errors.contactEmail?.message}
                      name="Contact Email"
                      registerName="contactEmail"
                    />
                    <FormInput
                      register={register}
                      error={errors.contactNumber?.message}
                      name="Contact Number"
                      registerName="contactNumber"
                    />

                    
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="flex justify-between items-center rounded-md 
                   bg-indigo-500 px-4 py-2 text-xs font-semibold
                    text-white hover:bg-indigo-600 hover:scale-110 
                    transition-all ease-in-out"
                      >
                        <div>Create +</div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

function FormInput({
  register,
  error,
  name,
  registerName,
  textArea,
}: {
  register: UseFormRegister<{
    eventName: string;
    eventDescription: string;
    eventStartTime: Date;
    eventEndTime: Date;
    eventDate: Date;
    eventState: string;
    eventCity: string;
    eventAdress: string;
    contactNumber: string;
    contactEmail: string;
}>
  error: string | undefined;
  name: string;
  registerName: any;
  textArea?: boolean;
}) {
  return (
    <div className="bg-transparent">
      <label className="block  mb-2 text-xs font-bold  ">{name}</label>
      {!textArea ? (
        <input
          className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
          {...register(registerName)}
        />
      ) : (
        
          <textarea
            rows={8}
            className=" border border-slate-400 text-xs rounded-lg  block w-full p-2.5 "
            {...register('eventDescription')}
          />
          
      )}

      <span className="text-red-400 text-xs pr-1 font-bold mb-3">{error}</span>
    </div>
  );
}