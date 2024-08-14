import Navbar from "../components/UserComponents/Navbar";
import heroImage from "/assets/data-protection-business.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("net-token");
    const user = localStorage.getItem("user");
    if (token !== null && user !== null)
      toast.success("you are currently logged in");
  }, []);

  return (
    <div className="h-screen text-white font-poppins px-14  bg-[url('/assets/Maskgroup.png')] bg-center ">
      <Toaster />
      <Navbar />
      <main className="flex justify-between p-6 pt-14 gap-10">
        <div className="w-[50vw]">
          <h1 className="text-4xl font-bold">
            Safeguard Your Digital Life with Our Cutting-Edge Cybersecurity
            Solutions
          </h1>
          <h4 className="text-2xl pt-6 text-gray-300">
            Experience unparalleled protection and peace of mind with our
            advanced security technologies, designed to defend you against
            today's cyber threats.
          </h4>

          <button
            className="bg-green-500 rounded-md px-6 py-2 hover:bg-green-700 mt-14"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </button>
        </div>
        <div>
          <img src={heroImage} alt="hero-image" className="w-[50vw]" />
        </div>
      </main>
    </div>
  );
};

export default Home;
