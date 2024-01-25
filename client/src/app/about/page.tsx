"use client";
import Head from "next/head";

export default function About() {
  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-200 min-h-screen">
      <Head>
        <title>About the Routine Generator</title>
        <meta
          name="description"
          content="Learn more about the College Routine Generator project"
        />
      </Head>

      <header className="bg-blue-600 text-white text-center py-10">
        <h1 className="text-5xl font-bold">About the Routine Generator</h1>
      </header>

      <main className="mt-10 mb-20 mx-auto max-w-4xl px-5">
        <section className="bg-white rounded-xl shadow-xl p-10 mb-10">
          <h2 className="text-3xl text-blue-500 font-bold mb-5">
            Project Purpose
          </h2>
          <p className="text-gray-600 text-lg">
            The College Routine Generator is designed to simplify the process of
            creating and managing academic schedules. It's a tool that aims to
            help students and faculty alike by automating the timetable
            creation, ensuring optimal class distribution, and minimizing
            conflicts.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-xl p-10 mb-10">
          <h2 className="text-3xl text-green-500 font-bold mb-5">About Me</h2>
          <p className="text-gray-600 text-lg">
            As a solo developer with a passion for education and technology, I
            created this project to address the challenges of college
            scheduling. My goal is to make the academic experience smoother for
            everyone involved by providing a user-friendly and efficient
            solution.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-3xl text-purple-500 font-bold mb-5">My Goals</h2>
          <p className="text-gray-600 text-lg">
            My aim is to continuously improve the Routine Generator by
            incorporating feedback and introducing new features. I believe in
            the power of education and technology to make a positive impact, and
            I am committed to making that a reality through this project.
          </p>
        </section>

        <section className="text-center mt-10">
          <h2 className="text-3xl text-red-500 font-bold mb-5">Contact Me</h2>
          <p className="text-gray-600 text-lg mb-5">
            For more information or inquiries about the College Routine
            Generator, feel free to reach out:
          </p>
          <a
            href="mailto:spoudel61@gmail.com"
            className="text-lg text-blue-600 hover:text-blue-700"
          >
            spoudel61@gmail.com
          </a>
        </section>
      </main>
    </div>
  );
}
