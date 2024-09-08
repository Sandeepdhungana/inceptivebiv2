import { fetchAuthSession, signInWithRedirect } from "aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation()
  console.log(location.state)
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        if (session?.tokens.accessToken) {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{isAuthenticated ? children : signInWithRedirect()}</>;
};

export default ProtectedRoute;
