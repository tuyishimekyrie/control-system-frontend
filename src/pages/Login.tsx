import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { postLoginData } from "../services/postData";
import { loginFormData } from "../types/RegisterForm";
import { loginSchema } from "../validations/registerSchema";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../utils/admin/AuthHook";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const mutation = useMutation({
    mutationFn: postLoginData,
    onSuccess: (data) => {
      console.log("Login successful!");
      toast.success("Login Successful!");
      reset();
      const token = data.token;
      localStorage.setItem("net-token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "manager") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error.message);
        const errorMessage =
          error.response?.data?.message || "Login Failed, Please try again";
        toast.error(errorMessage);
      } else {
        console.error(
          "An unexpected error occurred:",
          (error as Error).message
        );
        toast.error("An unexpected error occurred, please try again later.");
      }
    },
  });

  return (
    <div className="flex p-2 h-screen font-poppins">
      <div className="max-h-screen w-[50vw] max-sm:hidden">
        <img
          src="/assets/download16.png"
          className="h-full object-cover rounded-xl"
          alt="Login"
        />
      </div>
      <div className="flex flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
        <h1 className="text-3xl text-green-600">Welcome Back!</h1>
        <form
          className="flex flex-col gap-4 my-10 w-full"
          onSubmit={handleSubmit((data) => {
            console.log("Form data submitted:", data);
            mutation.mutate(data);
          })}
        >
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="Email"
            className="border border-slate-400 px-4 rounded-sm py-1 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Password"
            className="border border-slate-400 px-4 rounded-sm py-1 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-green-700 text-white py-2 rounded-sm hover:bg-green-900"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Login"}
          </button>

          {mutation.isSuccess && (
            <p className="text-green-500">Success! {mutation.data.message}</p>
          )}
        </form>
        <div className="flex gap-2 max-sm:flex-wrap">
          <p className="text-gray-500 text-sm">Don't Have An Account?</p>
          <span className="text-blue-700 text-sm underline hover:cursor-pointer">
            <Link to="/auth/register">Create Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
