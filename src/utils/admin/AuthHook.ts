import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("net-token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        setIsAuthenticated(false);
        navigate("/");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("net-token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return { isAuthenticated, logout };
};

export default useAuth;
