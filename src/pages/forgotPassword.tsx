/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { postForgotPassword, getUserByEmail } from "../services/postData";

type ForgotPasswordFormData = {
  email: string;
  newPassword?: string;
  confirmPassword?: string;
};

const ForgotPassword = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ForgotPasswordFormData>();

  const onSubmitEmail = async (data: ForgotPasswordFormData) => {
    setIsSubmittingEmail(true);
    try {
      const user = await getUserByEmail(data.email);
      if (user) {
        setSubmittedEmail(data.email);
        setEmailSubmitted(true);
        toast.success("Email found! Please set your new password.");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "User not found with this email.",
      );
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const onSubmitNewPassword = async (data: ForgotPasswordFormData) => {
    setIsSubmittingPassword(true);
    try {
      await postForgotPassword(
        submittedEmail,
        data.newPassword!,
        data.confirmPassword!,
      );
      toast.success("Password updated successfully!");
      reset();
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Error updating password. Please try again.",
      );
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const newPassword = watch("newPassword");

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
        {!emailSubmitted ? (
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
        ) : (
          <form
            className="flex flex-col gap-4 my-10 w-full"
            onSubmit={handleSubmit(onSubmitNewPassword)}
          >
            <label htmlFor="email" className="text-gray-500 text-sm">
              Email.
            </label>
            <input
              type="email"
              id="email"
              value={submittedEmail}
              readOnly
              className="border border-slate-400 px-4 rounded-sm py-1 text-sm focus:outline-none bg-gray-100"
            />

            <label htmlFor="newPassword" className="text-gray-500 text-sm">
              New password.
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              id="newPassword"
              placeholder="Enter new password"
              className="border border-slate-400 px-4 rounded-sm py-1 text-sm focus:outline-none"
              disabled={isSubmittingPassword}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}

            <label htmlFor="confirmPassword" className="text-gray-500 text-sm">
              Confirm New password.
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              id="confirmPassword"
              placeholder="Confirm new password"
              className="border border-slate-400 px-4 rounded-sm py-1 text-sm focus:outline-none"
              disabled={isSubmittingPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}

            <div className="flex justify-between w-full mt-4">
              <span className="text-gray-500 text-sm underline hover:cursor-pointer">
                <Link to="/auth/login">Back to Login</Link>
              </span>
              <button
                type="submit"
                className={`bg-green-700 text-white text-sm py-2 px-6 rounded-sm ${
                  isSubmittingPassword
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-900"
                }`}
                disabled={isSubmittingPassword}
              >
                {isSubmittingPassword ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
