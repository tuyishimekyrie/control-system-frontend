import { useNavigate } from "react-router-dom";
import logo from "/assets/netfella.png";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../utils/admin/AuthHook";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  console.log("isAuth", isAuthenticated.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("net-token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      toast.success("You are currently logged in");
    }
  }, []);

  const handleAuthAction = () => {
    const token = localStorage.getItem("net-token");
    const user = localStorage.getItem("user");

    if (token && user) {
      // User is logged in, perform logout
      localStorage.removeItem("net-token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    }

    // Navigate to login page regardless of logged-in state
    navigate("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center p-4  text-white font-poppins">
      <Toaster />
      <img src={logo} alt="logo" className="w-16" />
      <button
        className="bg-green-500 rounded-md px-6 py-2 hover:bg-green-700 transition-colors"
        onClick={handleAuthAction}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;
