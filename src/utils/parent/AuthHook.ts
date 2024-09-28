import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  role: string;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("net-token");
      const userJson = localStorage.getItem("user");

      if (!token || !userJson) {
        setIsAuthenticated(false);
        navigate("/");
      } else {
        const userData: User = JSON.parse(userJson);
        setUser(userData);
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

  return { isAuthenticated, user, logout };
};

export default useAuth;
