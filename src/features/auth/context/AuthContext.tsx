import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenWithExpiry } from "../../../utils/helpers";

// Define the type for AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean; // Include loading state
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

// Create Auth Context with an initial value of null
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getTokenWithExpiry("access_token");
    const publicRoutes = ["/login", "/register", "/verify-email", '/checkout'];

    // Set the authentication state based on the presence of a token
    if (!token) {
      setIsAuthenticated(false);
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false); // Set loading to false after checking the token
  }, [navigate, location]);

  // If loading, don't render children yet
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        {/* Loading spinner code */}
        <div role="status">
          {/* Spinner SVG */}
          <svg aria-hidden="true" className="w-12 h-12 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths */}
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
