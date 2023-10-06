/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppContext } from "@/context/AppContext";

function UserCard({ user }) {
  const { logoutUser } = useAppContext();

  console.log(user);

  return (
    <div className="bg-gray-50 text-gray-950 flex flex-col gap-5 p-5 rounded">
      <div
        className={`${
          user.photoURL &&
          "flex justify-between gap-5 sm:flex-row flex-col items-center"
        }`}
      >
        <h1 className="sm:text-2xl sm:text-left text-xl font-bold text-center">
          Welcome {user.email}!
        </h1>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt={user.email}
            className="sm:w-auto sm:mx-0 w-24 mx-auto rounded-full"
          />
        )}
      </div>
      <button
        className="hover:bg-red-600 w-fit text-gray-50 sm:text-xl px-4 py-2 mx-auto text-lg transition-colors ease-in bg-red-700 rounded"
        onClick={() => logoutUser()}
      >
        Logout
      </button>
    </div>
  );
}

export default UserCard;
