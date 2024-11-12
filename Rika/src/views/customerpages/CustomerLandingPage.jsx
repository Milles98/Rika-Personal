import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../lib/AuthProvider.jsx";
import LogoutButton from "../../common/LogoutButton.jsx";

const CustomerLandingPage = () => {
  const { userRole, isAuthenticated, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    const authorizeUser = async () => {
      await checkAuth();
    };

    authorizeUser();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <div>I am not authenticated.</div>;
  }

  if (userRole !== "Customer") {
    return <div>I am not a customer.</div>;
  }

  return (
    <div>
      <h1>Welcome customer!</h1>
      <LogoutButton />
    </div>
  );
};

export default CustomerLandingPage;
