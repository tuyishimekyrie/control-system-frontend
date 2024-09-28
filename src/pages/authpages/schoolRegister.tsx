import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { postData } from "../../services/postData";
import { schema } from "../../validations/registerSchema";
import axios from "axios";
import {
  RegisterFormData,
  RegisterRequestData,
} from "../../types/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const SchoolRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      console.log("School registration successful!");
      toast.success("Registration Successful!");
      reset();
      navigate("/auth/login");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error("Registration error:", error.message);
        const errorMessage = error.response?.data;
        toast.error(errorMessage);
      } else {
        console.error(
          "An unexpected error occurred:",
          (error as Error).message,
        );
        toast.error("An unexpected error occurred, please try again later.");
      }
    },
  });

  return (
    <div className="flex p-2 h-screen font-poppins">
      <Toaster />
      <div className="max-h-screen w-[50vw] max-sm:hidden">
        <img
          src="/assets/download16.png"
          className="h-full object-cover rounded-xl"
          alt="Register"
        />
      </div>
      <div className="flex flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
        <h1 className="text-3xl text-green-600">Register Your School</h1>
        <form
          className="flex flex-col gap-4 my-10 w-full"
          onSubmit={handleSubmit((data) => {
            const requestData: RegisterRequestData = {
              schoolName: data.name,
              email: data.email,
              password: data.password,
              role: "school",
              isSchool: true,
            };
            mutation.mutate(requestData);
          })}
        >
          <input
            type="text"
            {...register("name")}
            id="name"
            placeholder="School Name"
            className="border border-slate-400 px-4 rounded-sm py-1 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

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
            {mutation.isPending ? "Submitting..." : "Create Account"}
          </button>

          {mutation.isSuccess && (
            <p className="text-green-500">Success! {mutation.data.message}</p>
          )}
        </form>
        <div className="flex gap-2 max-sm:flex-wrap">
          <p className="text-gray-500 text-sm">Already Have An Account?</p>
          <span className="text-blue-700 text-sm underline hover:cursor-pointer">
            <Link to="/auth/login">Sign In</Link>
          </span>
        </div>
      </div>
      {mutation.isPending && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-950 bg-opacity-50">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </div>
  );
};

export default SchoolRegister;
