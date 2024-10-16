/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/postData";

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setResetToken(token);
    } else {
      toast.error("Invalid or missing token.");
      navigate("/auth/forgot-password");
    }
  }, [navigate, searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ResetPasswordFormData>();

  const newPassword = watch("newPassword");

  const onSubmitNewPassword = async (data: ResetPasswordFormData) => {
    setIsSubmittingPassword(true);
    try {
      const response = await resetPassword(
        resetToken,
        data.newPassword,
        data.confirmPassword,
      );
      if (response.message) {
        toast.success("Password updated successfully!");
        reset();
        navigate("/auth/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating password.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return (
    <div className="flex p-2 h-screen font-poppins">
      <Toaster />
      <div className="max-h-screen w-[50vw] max-sm:hidden">
        <img
          src="/assets/download16.png"
          className="h-full object-cover rounded-xl"
          alt="Reset Password"
        />
      </div>
      <div className="flex flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
        <h1 className="text-3xl text-green-600">Reset Password</h1>
        <form
          className="flex flex-col gap-4 my-10 w-full"
          onSubmit={handleSubmit(onSubmitNewPassword)}
        >
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
            <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
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
      </div>
    </div>
  );
};

export default ResetPassword;
