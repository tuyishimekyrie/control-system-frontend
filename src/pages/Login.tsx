import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { postLoginData } from "../services/postData";
import { loginFormData } from "../types/RegisterForm";
import { loginSchema } from "../validations/registerSchema";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("net-token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === "manager") {
        navigate("/manager");
      } else if (parsedUser.role === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: postLoginData,
    onSuccess: (data) => {
      console.log("Login successful!");
      console.log(data);
      toast.success("Login Successful!");
      reset();
      const token = data.token;
      localStorage.setItem("net-token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on user role
      if (data.user.role === "manager") {
        navigate("/manager");
        // Fetch user's location and log it if role is "user"
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Send location to backend
            fetch("http://localhost:4000/api/v1/update-location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Attach token for authentication
              },
              body: JSON.stringify({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                userId: data.user.userId,
                latitude,
                longitude,
              }),
            })
              .then((response) => response.json())
              .then((locationData) => {
                console.log("Location logged:", locationData);
              })
              .catch((error) => {
                console.error("Failed to log location:", error);
                toast.error("Failed to log location.");
              });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
            toast.error("Failed to get location.");
          },
        );
      } else if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "user") {
        // Fetch user's location and log it if role is "user"
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Send location to backend
            fetch("http://localhost:4000/api/v1/update-location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Attach token for authentication
              },
              body: JSON.stringify({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                userId: data.user.userId,
                latitude,
                longitude,
              }),
            })
              .then((response) => response.json())
              .then((locationData) => {
                console.log("Location logged:", locationData);
              })
              .catch((error) => {
                console.error("Failed to log location:", error);
                toast.error("Failed to log location.");
              });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
            toast.error("Failed to get location.");
          },
        );
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
          alt="Login"
        />
      </div>
      <div className="flex flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
        <h1 className="text-3xl text-green-600">Login to Your Account</h1>
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
          <button
            className="bg-green-700 text-white py-2 rounded-sm hover:bg-green-900"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>

          {mutation.isSuccess && (
            <p className="text-green-500">Success! {mutation.data.message}</p>
          )}
        </form>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 max-sm:flex-wrap">
            <p className="text-gray-500 text-sm">Don't Have An Account?</p>
            <span className="text-blue-700 text-sm underline hover:cursor-pointer">
              <Link to="/auth/register">Create Account</Link>
            </span>
          </div>
          <span className="text-gray-500 text-sm underline hover:cursor-pointer">
            <Link to="/auth/forgot-password"> Forgot Password?</Link>
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
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
