/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { sendResetLink } from "../services/postData";

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword = () => {
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>();

  const onSubmitEmail = async (data: ForgotPasswordFormData) => {
    setIsSubmittingEmail(true);
    try {
      const response = await sendResetLink(data.email);
      if (response.message) {
        toast.success("Reset link sent! Please check your email.");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error sending reset link.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="flex p-2 h-screen font-poppins">
      <Toaster />
      <div className="max-h-screen w-[50vw] max-sm:hidden">
        <img
          src="/assets/download16.png"
          className="h-full object-cover rounded-xl"
          alt="Forgot Password"
        />
      </div>
      <div className="flex flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
        <h1 className="text-3xl text-green-600">Reset Password</h1>
        <form
          className="flex flex-col gap-4 my-10 w-full"
          onSubmit={handleSubmit(onSubmitEmail)}
        >
          <label htmlFor="email" className="text-gray-500 text-sm">
            Enter your Email and we'll verify you to get a new password.
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            id="email"
            placeholder="Enter your email"
            className="border border-slate-400 px-4 rounded-sm py-1 text-sm focus:outline-none"
            disabled={isSubmittingEmail}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <div className="flex justify-between w-full mt-4">
            <span className="text-gray-500 text-sm underline hover:cursor-pointer">
              <Link to="/auth/login">Back to Login</Link>
            </span>
            <button
              type="submit"
              className={`bg-green-700 text-white py-2 px-6 text-sm rounded-sm ${
                isSubmittingEmail
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-900"
              }`}
              disabled={isSubmittingEmail}
            >
              {isSubmittingEmail ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
