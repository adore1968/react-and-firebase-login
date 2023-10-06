/* eslint-disable react/no-unescaped-entities */
"use client";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { error, loginUser, loginUserWithGoogle, forgotPassword } =
    useAppContext();

  const onSubmit = handleSubmit((data) => {
    loginUser(data);
  });

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <p className="sm:text-xl text-lg text-center text-red-500">{error}</p>
      )}
      <form
        onSubmit={onSubmit}
        className="bg-gray-50 text-gray-950 flex flex-col gap-5 p-5 rounded"
      >
        <div>
          <label htmlFor="email" className="sm:text-2xl text-xl font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="youremail@company.ltd"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
            className="w-full border mt-1 mb-2.5 bg-gray-950 text-lg sm:text-xl text-gray-200 px-4 py-2 rounded"
          />
          {errors.email && (
            <p className="sm:text-xl text-lg text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sm:text-2xl text-xl font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            {...register("password", {
              required: {
                value: true,
                message: "This field is required",
              },
              minLength: {
                value: 6,
                message: "The password must be at least 6 characters",
              },
            })}
            className="w-full border mt-1 mb-2.5 bg-gray-950 text-lg sm:text-xl text-gray-200 px-4 py-2 rounded"
          />
          {errors.password && (
            <p className="sm:text-xl text-lg text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="sm:text-xl w-fit text-gray-50 hover:bg-blue-600 px-4 py-2 text-lg transition-colors ease-in bg-blue-700 border rounded"
          >
            Login
          </button>
          <p
            className="sm:text-xl hover:text-red-600 text-lg font-medium text-red-700 transition-colors ease-in cursor-pointer"
            onClick={() => forgotPassword(getValues("email"))}
          >
            Forgot password?
          </p>
        </div>
      </form>
      <div className="flex items-center justify-between">
        <p className="sm:text-xl text-lg font-medium text-gray-200">
          Don't have an account?
        </p>
        <Link
          href="/register"
          className="hover:bg-red-500 sm:text-xl px-4 py-2 text-lg transition-colors ease-in bg-red-600 rounded"
        >
          Register
        </Link>
      </div>
      <button
        type="button"
        className="hover:bg-gray-500 sm:text-xl px-4 py-2 text-lg transition-colors ease-in bg-gray-600 rounded"
        onClick={() => loginUserWithGoogle()}
      >
        Google login
      </button>
    </div>
  );
}

export default LoginForm;
