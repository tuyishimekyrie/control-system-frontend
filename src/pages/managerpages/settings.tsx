import { useQuery } from "@tanstack/react-query";
import { MdOutlineDangerous } from "react-icons/md";
import { useLocalStorage } from "../../hooks";
import { fetchUserByEmail } from "../../services/postData";
import { ColorRing } from "react-loader-spinner";

export const Settings: React.FC = () => {
  const { email } = useLocalStorage();
  const {
    data,
    isLoading,
    isError: error,
  } = useQuery({
    queryKey: ["userEmail", email],
    queryFn: () => {
      if (!email) {
        return Promise.reject("No email found");
      }
      return fetchUserByEmail(email);
    },
    staleTime: Infinity,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center mt-40"
        style={{ backgroundColor: "#161b2d" }}
      >
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
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center mt-40"
        style={{ backgroundColor: "#161b2d" }}
      >
        <div
          className="text-center p-10 rounded-lg shadow-lg"
          style={{ backgroundColor: "#1F2A45" }}
        >
          <h1 className="text-[20px] font-bold text-red-500 mb-4">
            <MdOutlineDangerous className="inline mr-2 text-[25px]" />
            SETTINGS UNAVAILABLE
          </h1>
          <p className="text-gray-500 mb-6 text-[14px]">
            We're sorry, but the settings page is currently unavailable. Please
            try again later.
          </p>
          <div className="bg-green-600 p-4 rounded-lg">
            <p className="text-gray-300 text-[14px]">
              If you need immediate assistance, please contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center mt-10"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div
        className="text-start p-10 rounded-lg shadow-lg"
        style={{ backgroundColor: "#1F2A45" }}
      >
        <h1 className="text-[20px] font-bold text-green-500 mb-4">
          <MdOutlineDangerous className="inline mr-2 text-[25px]" />
          SETTINGS LOADED
        </h1>
        <p className="text-gray-500 mb-6 text-[14px]">
          Settings loaded successfully. You can now manage your settings.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-300 mb-2 text-[14px]">
            <strong>Name:</strong> {data?.name}
          </p>
          <p className="text-gray-300 mb-2 text-[14px]">
            <strong>Email:</strong> {data?.email}
          </p>
          <p className="text-gray-300 mb-2 text-[14px]">
            <strong>Role:</strong> {data?.role}
          </p>
          <p className="text-gray-300 mb-2 text-[14px]">
            <strong>Subscribed:</strong>{" "}
            {data?.isSubscribed ? "Active" : "Not Active"}
          </p>
        </div>
      </div>
    </div>
  );
};
