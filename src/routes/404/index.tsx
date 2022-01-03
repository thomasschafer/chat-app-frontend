import { Link } from "react-router-dom";

export const PageNotFound = () => (
  <main className="w-screen h-screen flex justify-center align-middle bg-primaryPurple">
    <div className="flex flex-col justify-center items-center align-middle py-20 px-5 sm:px-20 text-center w-11/12 h-fit-content max-w-screen-sm my-auto rounded-xl bg-white">
      <h1 className="mb-3 text-primaryPurpleLight font-bold">404 Error</h1>
      <p>
        Sorry, that page doesn't exist. Please click{" "}
        <Link
          to="/"
          className="font-bold text-primaryPurple hover:underline hover:text-primaryPurpleLight"
        >
          here
        </Link>{" "}
        to return to the home screen.
      </p>
    </div>
  </main>
);
