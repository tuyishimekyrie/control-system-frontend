/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchoolSchema } from "../../validations/updateOrganizationSchema";
import { updateSchool } from "../../services/postData";

interface UpdateSchoolProps {
  school: {
    id: string;
    name: string;
    maxUsers: number;
  };
  onClose: () => void;
  refetchSchools: () => void;
}

const UpdateSchool: React.FC<UpdateSchoolProps> = ({
  school,
  onClose,
  refetchSchools,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateSchoolSchema),
    defaultValues: {
      name: school.name,
      maxUsers: school.maxUsers,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string; maxUsers: number }) =>
      updateSchool(school.id, data),
    onSuccess: () => {
      toast.success("School updated successfully!");
      reset();
      refetchSchools();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit = (data: { name: string; maxUsers: number }) => {
    const parsedData = {
      ...data,
      maxUsers: Number(data.maxUsers),
    };

    mutation.mutate(parsedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster />
      <div className="bg-[#1F2A40] p-5 rounded-lg shadow-lg w-[90%] max-w-[400px]">
        <h2 className="text-white text-[18px] font-bold mb-4">Update School</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2" htmlFor="name">
              School Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-100 focus:outline-none"
              placeholder="Enter school name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm mb-2"
              htmlFor="maxUsers"
            >
              Max Devices
            </label>
            <input
              type="number"
              id="maxUsers"
              {...register("maxUsers")}
              className="w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-100 focus:outline-none"
              placeholder="Enter maximum number of Devices"
            />
            {errors.maxUsers && (
              <p className="text-red-500 text-xs">{errors.maxUsers.message}</p>
            )}
          </div>
          <div className="flex mt-8">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[50%]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-[50%] ml-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSchool;
