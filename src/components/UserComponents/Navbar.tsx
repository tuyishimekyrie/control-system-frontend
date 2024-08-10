import { useNavigate } from "react-router-dom";
import logo from "/assets/netfella.png";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("net-token");
    if (token) {
      setIsLoggedIn(true);
      toast.success("You are currently logged in");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Clear the token and log out
      localStorage.removeItem("net-token");
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="flex justify-between items-center p-4  text-white font-poppins">
      <Toaster />
      <div>
        <img src={logo} alt="logo" className="w-16" />
      </div>
      <button
        className="bg-green-500 rounded-md px-6 py-2 hover:bg-green-700 transition-colors"
        onClick={handleAuthAction}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
