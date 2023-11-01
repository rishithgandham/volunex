/* eslint-disable @next/next/no-img-element */
'use client';
import { withPublic } from '@/auth/auth_route';
import { Satisfy, Kalam } from 'next/font/google';
const open_sans = Kalam({ subsets: ['latin'], weight: '700' });

function Home() {
  return (
    <>
      {/* <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/1000] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
      </div> */}
      <div className="mx-auto max-w-2xl py-32 h-screen flex w-full justify-center items-center p-5">
        <div className="text-center">
          <h1
            className={`text-4xl font-extrabold tracking-tight  sm:text-6xl ${open_sans.className}`}
          >
            Document Your Volunteer Journey,{' '}
            <p className="font-bold inline  bg-gradient-to-r from-indigo-400 via-indigo-600  to-blue-500 bg-clip-text text-transparent">
              Amplify Your Impact.
            </p>
          </h1>
          <p className="mt-6 text-lg font-bold leading-8 text-black">
          <p className="inline font-extrabold text-xl italic __className_7e445c text-indigo-500">
              Opportunity,{' '}
            </p>
            The ultimate resource to steamline your{' '}
            <p className="inline font-extrabold text-xl italic __className_7e445c text-indigo-500">
              volunteering
            </p>
            .
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/auth/login"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm  font-semibold text-white shadow-sm hover:bg-indigo-500 hover:scale-110 transition-all ease-in-out"
            >
              Get started
            </a>
            <a
              href="/aboutus"
              className="text-sm group flex items-center font-semibold leading-6 text-gray-900"
            >
              Learn more{' '}
              <p className="group-hover:translate-x-3 transition-all ease-in-out ml-2">
                →
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-black">
              Find volunteering opportunities to add to{' '}
              <p className="font-bold text-indigo-500 inline italic">your</p>{' '}
              portfolio
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Impact,{' '}
              <p className="font-bold inline  bg-gradient-to-r from-indigo-400 via-indigo-600  to-blue-500 bg-clip-text text-transparent">
                Well Recorded
              </p>
            </p>
            <p className="mt-6 text-md font-bold leading-8 text-gray-600">
              <p className="font-extrabold inline  bg-gradient-to-r from-indigo-400 via-indigo-600  to-blue-500 bg-clip-text text-transparent">
                Streamlining{' '}
              </p>
              the volunteering process.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl  lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <ion-icon name="albums-outline"></ion-icon>
                  </div>
                  Find Volunteering Opportunities
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 font-semibold">
                  Search our database of multiple volunteering opportunities in
                  specific areas, or create an opportunity yourself
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <ion-icon name="add-circle-outline"></ion-icon>
                  </div>
                  Add events to your portfolio
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 font-semibold">
                  By requesting verification of your volunteering, it will
                  automatically be added into your portfolio, where you can
                  check it&apos;s verification status
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                  </div>
                  Request Verification from Event Organizers
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 font-semibold">
                  Request cerification of your volunteering hours by filling out
                  information and sending a short reflection to an Event
                  Organizer
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <ion-icon
                      name="share-outline"
                      className="text-white "
                    ></ion-icon>
                  </div>
                  Share your portfolio to schools, extracurriculars, and more!
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 font-semibold">
                  Get the link to your sharable volunteering portfolio link with
                  the click of a button!
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <blockquote className="text-center text-lg font-bold leading-8 text-gray-900  ">
              <p >
                {'"'}As an avid volunteer and someone passionate about making a
                difference, I cannot recommend opportunity enough. This incredible
                app has transformed the way I document my volunteer work, with
                its intuitive interface, accurate time tracking, and
                comprehensive task logging.{'"'}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Saanvi Gandham</div>
                <p className="mx-4">|</p>
                <div className="text-gray-600">
                  Student at J.R. Tucker
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-2 grid-cols-1 m-5 mb-20 xl:w-2/3 w-full">
          <div className="md:px-32 py-32  text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight  mb-10 sm:text-4xl bg-gradient-to-r from-indigo-400 via-indigo-600  to-blue-500 bg-clip-text text-transparent">
              Uncover Meaningful Opportunities, Capture Your Impact, Share Your
              Volunteering Story.
            </h2>
            <p className="mt-6 text-lg leading-8 font-bold">
              Get Started{' '}
              <p className=" inline bg-gradient-to-r from-indigo-400 via-indigo-600  to-blue-500 bg-clip-text text-transparent">
                Now
              </p>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 hover:scale-110 transition-all ease-in-out "
              >
                Get started
              </a>
              <a
                href="/aboutus"
                className="text-sm group flex items-center font-semibold leading-6 text-gray-900"
              >
                Learn more{' '}
                <p className="group-hover:translate-x-3 transition-all ease-in-out ml-2">
                  →
                </p>
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <img
              className=" w-[300px] h-[300px] max-w-none rounded-md "
              src="/herosvg1.svg"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>

      {/* 
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              
            </div>
          </div> */}
      {/* 
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
    </div> */}
    </>
  );
}
export default Home;
