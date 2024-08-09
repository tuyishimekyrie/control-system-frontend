const Settings = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div className="text-center bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className=" text-[20px] font-bold text-gray-400 mb-4">
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
