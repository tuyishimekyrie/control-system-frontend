/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDangerous } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Profile from "../../assets/tim.jpg";
import { fetchUserByEmail, updateUser } from "../../services/postData";
import toast, { Toaster } from "react-hot-toast";

const Settings: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [fullView, setFullView] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUpdated, setImageUpdated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { email } = JSON.parse(storedUser);

      if (email) {
        fetchUserByEmail(email)
          .then((response) => {
            setUser(response.user);
            console.log(response.user);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    }
  }, []);

  const handleImageClick = () => setFullView(!fullView);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fullView &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFullView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fullView]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImage(event.target.files[0]);
    }
  };

  const handleCancel = () => {
    setNewImage(null);
    setFullView(false);
  };

  const handleUpdateImage = async () => {
    if (newImage) {
      const imageData = new FormData();
      imageData.append("file", newImage);

      try {
        // @ts-ignore
        const updatedUser = await updateUser(user.id, imageData);
        toast.success("Image updated successfully!");
        setUser({ ...user, image: URL.createObjectURL(newImage) });
        setNewImage(null);
        setFullView(false);
        setImageUpdated(true);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  useEffect(() => {
    if (!fullView && imageUpdated) {
      window.location.reload();
      setImageUpdated(false);
    }
  }, [fullView, imageUpdated]);

  if (!user) {
    return <p className="text-[14px] p-10">Loading information...</p>;
  }

  return (
    <div
      className="flex items-center justify-center mt-10"
      style={{ backgroundColor: "#161b2d" }}
    >
      <Toaster />
      <div
        ref={containerRef}
        className="text-center p-10 rounded-lg shadow-lg"
        style={{ backgroundColor: "#1F2A45" }}
      >
        {!fullView ? (
          <>
            <div
              className="mb-4 relative w-32 h-32 mx-auto cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={
                  user.image ? `http://localhost:4000/${user.image}` : Profile
                }
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-20 right-0 flex justify-center items-center space-x-1 bg-green-600 rounded-sm w-[60px]">
                <CiEdit className="text-white text-[20px]" />
                <span className="text-white text-sm font-semibold">Edit</span>
              </div>
            </div>
            <h1 className="text-[20px] font-bold text-green-500 mb-4">
              <MdOutlineDangerous className="inline mr-2 text-[25px]" />
              SETTINGS LOADED
            </h1>
            <p className="text-gray-500 mb-6 text-[14px]">
              Settings loaded successfully. You can now manage your settings.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 mb-2 text-[14px]">
                <strong>Name:</strong> {user.name || "N/A"}
              </p>
              <p className="text-gray-300 mb-2 text-[14px]">
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p className="text-gray-300 mb-2 text-[14px]">
                <strong>Role:</strong> {user.role || "N/A"}
              </p>
              <p className="text-gray-300 mb-2 text-[14px]">
                <strong>Subscribed:</strong>{" "}
                {user.isSubscribed ? "Active" : "Not Active"}
              </p>
            </div>
          </>
        ) : (
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <img
              src={
                newImage
                  ? URL.createObjectURL(newImage)
                  : user.image
                    ? `http://localhost:4000/${user.image}`
                    : Profile
              }
              alt="Profile Full View"
              className="max-w-full max-h-80 rounded-lg object-cover"
            />
            {!newImage ? (
              <label className="mt-4 cursor-pointer">
                <span className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleUpdateImage}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
