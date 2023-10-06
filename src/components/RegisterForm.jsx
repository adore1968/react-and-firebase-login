"use client";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, registerUser } = useAppContext();

  const onSubmit = handleSubmit((data) => {
    registerUser(data);
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
        <button
          type="submit"
          className="sm:text-xl w-fit text-gray-50 hover:bg-blue-600 px-4 py-2 mx-auto text-lg transition-colors ease-in bg-blue-700 border rounded"
        >
          Register
        </button>
      </form>
      <div className="flex items-center justify-between">
        <p className="sm:text-xl text-lg text-gray-200">
          Already have an account?
        </p>
        <Link
          href="/login"
          className="hover:bg-red-500 sm:text-xl px-4 py-2 text-lg transition-colors ease-in bg-red-600 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
