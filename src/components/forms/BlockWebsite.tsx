import { blockschema } from "../../validations/blockSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlockFormData } from "../../types/BlockWebsite";
import { useForm } from "react-hook-form";
import { blockWebsite } from "../../services/postData";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

function BlockWebsite() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlockFormData>({
    resolver: zodResolver(blockschema),
  });

  const mutation = useMutation({
    mutationFn: blockWebsite,
    onSuccess: (data) => {
      console.log("Website Blocked successful!");
      toast.success(data.message);
      reset();
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error("Blocking error:", error.message);
        const errorMessage =
          error.response?.data?.message || "Blocking Failed, Please try again";
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
    <div className="flex flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
      <h1 className="text-3xl text-green-600">Block a Website</h1>
      <form
        className="flex flex-col gap-4 my-10 w-full"
        onSubmit={handleSubmit((data) => {
          console.log("Form data submitted:", data);
          mutation.mutate(data);
        })}
      >
        <input
          type="text"
          {...register("name")}
          id="name"
          placeholder="Name"
          className="border border-slate-400 px-4 rounded-sm py-1 focus:outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}

        <input
          type="text"
          {...register("url")}
          id="text"
          placeholder="URL"
          className="border border-slate-400 px-4 rounded-sm py-1 focus:outline-none"
        />
        {errors.url && (
          <p className="text-red-500 text-xs">{errors.url.message}</p>
        )}

        <button
          type="submit"
          className="bg-green-700 text-white py-2 rounded-sm hover:bg-green-900"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Block Website"}
        </button>

        {mutation.isSuccess && (
          <p className="text-green-500">Success! {mutation.data.message}</p>
        )}
      </form>
    </div>
  );
}

export default BlockWebsite;
