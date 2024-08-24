import { MdOutlineDangerous } from "react-icons/md";
const Settings = () => {
  return (
    <div
      className="flex items-center justify-center mt-40"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div
        className="text-center p-10 rounded-lg shadow-lg"
        style={{ backgroundColor: "#1F2A45" }}
      >
        <h1 className=" text-[20px] font-bold text-red-500 mb-4">
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
};

export default Settings;
