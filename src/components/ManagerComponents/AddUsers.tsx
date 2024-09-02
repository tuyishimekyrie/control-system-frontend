import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../../validations/registerSchema";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AddUser } from "../../services/postData";
import { AddUserFormData } from "../../types/RegisterForm";
import { useEffect, useState } from "react";

const AddUsers = ({
  setShowAddUserForm,
}: {
  setShowAddUserForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(userRegisterSchema),
  });
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.organizationId) {
        setOrganizationId(parsedUser.organizationId);
      }
    }
  }, []);

  const mutation = useMutation({
    mutationFn: (data: AddUserFormData) => {
      return AddUser({
        ...data,
        role: "user",
        isOrganization: false,
        organizationId: organizationId!,
      });
    },
    onSuccess: () => {
      toast.success(
        "User added successfully! Consider logging out, to log in as the new user.",
      );
      setShowAddUserForm(false);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const onSubmit = (data: AddUserFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster />
      <div className="bg-[#1F2A40] p-5 rounded-lg shadow-lg w-[90%] max-w-[400px]">
        <h2 className="text-white text-[18px] font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-100 focus:outline-none"
              placeholder="Enter user's email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-100 focus:outline-none"
              placeholder="Enter user's password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="flex mt-8">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[50%]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Add User"}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-[50%] ml-2"
              onClick={() => setShowAddUserForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;