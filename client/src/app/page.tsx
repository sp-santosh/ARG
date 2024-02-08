import Image from "next/image";
import { Fragment } from "react";

export default function Home() {
  return (
    <>
      <html
        lang="en"
        className="!scroll-smooth"
        suppressHydrationWarning={true}
      >
        <body className="bg-gray-100 font-sans leading-normal tracking-normal">
          <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block xl:inline">
                        Automatic Routine Generator for Colleges
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Welcome to the Routine Generator Dashboard. This tool utilizes genetic algorithms to automatically create optimized routines for colleges based on various constraints and preferences.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <a
                          href="#"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Get Started
                        </a>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href="#"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>

          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                  Features
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  What the Routine Generator Offers
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  The Routine Generator provides the following key features:
                </p>
              </div>

              <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"></div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Feature 1: Genetic Algorithm Optimization
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      The generator uses genetic algorithms to efficiently optimize college routines, ensuring they meet various criteria and constraints.
                    </dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"></div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Feature 2: Custom Constraints and Preferences
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Users can specify custom constraints and preferences, such as class timings, teacher availability, and room allocations, to tailor the generated routines according to their needs.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <footer className="bg-gray-800">
            <div className="container mx-auto px-6 pt-10 pb-6">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 text-center md:text-left">
                  <h5 className="uppercase mb-6 font-bold text-white">Links</h5>
                  <ul className="mb-4">
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        FAQ
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        Help
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/4 text-center md:text-left">
                  <h5 className="uppercase mb-6 font-bold text-white">Legal</h5>
                  <ul className="mb-4">
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        Terms
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        Privacy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/4 text-center md:text-left">
                  <h5 className="uppercase mb-6 font-bold text-white">
                    Company
                  </h5>
                  <ul className="mb-4">
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-200 hover:underline"
                      >
                        Careers
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
