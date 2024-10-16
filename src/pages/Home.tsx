import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UserComponents/Navbar";
import AccountTypeModal from "../components/UserComponents/AccountType";
import heroImage from "../assets/newsecurity-removebg-preview.png";
import img1 from "../assets/3188817.webp";
import img2 from "../assets/cyber.jpg";
import img3 from "../assets/cyber1.jpg";
import img4 from "../assets/images1.jpg";

export interface ActivityLog {
  name: string;
  email: string;
  url: string;
  duration: number;
  timestamp: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("net-token");
    const user = localStorage.getItem("user");
    if (token !== null && user !== null) {
      toast.success("You are currently logged in");
    }
  }, []);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950900 text-white font-poppins  bg-[url('/assets/Maskgroup.png')] bg-center">
      <Toaster />
      <Navbar />
      <main className="flex justify-between items-center p-6 pt-14 gap-10 px-14">
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
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
        <div>
          <img src={heroImage} alt="hero-image" className="w-[50vw]" />
        </div>
      </main>

      <AccountTypeModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        navigate={navigate}
      />

      <section className="about py-20 ">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primaryColor mb-8">
            Safeguard Your Digital Life with Our Cutting-Edge Cybersecurity
            Solutions
          </h2>
          <p className="text-lg text-center text-gray-300 mb-12">
            Experience unparalleled protection and peace of mind with our
            advanced security technologies, designed to defend you against
            today's cyber threats. Our solutions are tailored to provide
            comprehensive digital security for both individuals and businesses,
            ensuring that your data remains safe and secure.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg  transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center w-full ">
                <img
                  src={img1}
                  alt="Real-time Monitoring"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-textColorPurple mb-2">
                Real-Time Monitoring
              </h3>
              <p className="text-gray-600 text-center px-6">
                Stay ahead of threats with our 24/7 real-time monitoring system.
                We identify and neutralize potential risks before they can
                compromise your security.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg  transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center w-full ">
                <img
                  src={img2}
                  alt="Real-time Monitoring"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-textColorPurple mb-2">
                AI-Powered Threat Detection
              </h3>
              <p className="text-gray-600 text-center">
                Harness the power of artificial intelligence to detect and block
                sophisticated cyberattacks. Our AI algorithms constantly learn
                and evolve to provide optimal security.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center w-full ">
                <img
                  src={img1}
                  alt="Real-time Monitoring"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-textColorPurple mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-gray-600 text-center">
                Protect your sensitive information with military-grade
                encryption, ensuring that your data remains safe during
                transmission and storage.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-lg rounded-lg  transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center ">
                <img
                  src={img3}
                  alt="Real-time Monitoring"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-textColorPurple mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-gray-600 text-center p-6">
                Our software is designed with ease-of-use in mind. No technical
                background is needed to configure and use our robust security
                features.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white shadow-lg rounded-lg  transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center ">
                <img
                  src={img4}
                  alt="Real-time Monitoring"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-textColorPurple mb-2">
                Custom Security Alerts
              </h3>
              <p className="text-gray-600 text-center p-6">
                Set up custom alerts to get notified whenever suspicious
                activity is detected, allowing you to take immediate action.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white shadow-lg rounded-lg  transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center ">
                <img
                  src={img1}
                  alt="Real-time Monitoring"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-textColorPurple mb-2">
                Cross-Platform Support
              </h3>
              <p className="text-gray-600 text-center p-6">
                Whether you're on Windows, macOS, or mobile devices, our
                solution provides seamless protection across all your digital
                platforms.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-16">
            <button
              className="bg-green-500 rounded-md px-6 py-2 hover:bg-green-700 mt-14"
              onClick={handleRegisterClick}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-4">
                About Us
              </h4>
              <p className="text-gray-400">
                We provide cutting-edge cybersecurity solutions to safeguard
                your digital life. With advanced technologies and AI-powered
                threat detection, we ensure your data is protected 24/7.
              </p>
            </div>

            {/* Links Section */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-4">
                Quick Links
              </h4>
              <ul>
                <li className="mb-2">
                  <a
                    href="/about"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/features"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    Features
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/pricing"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/contact"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-4">Support</h4>
              <ul>
                <li className="mb-2">
                  <a
                    href="/faq"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    FAQ
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/help-center"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/privacy"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/terms"
                    className="hover:text-primaryColor transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-4">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-gray-400 mb-4">
                Stay updated with the latest news and cybersecurity tips.
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-primaryColorHover transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 NetFella. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primaryColor transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primaryColor transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primaryColor transition duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
