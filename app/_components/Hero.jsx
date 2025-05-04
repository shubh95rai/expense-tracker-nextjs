import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white  min-h-screen grid place-content-center dark:bg-gray-900">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white leading-tight tracking-tight">
            Manage your Expense
            <p className="text-indigo-600 block "> Control your Money</p>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Start creating your budget and track your expenses with ease.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="/dashboard"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
