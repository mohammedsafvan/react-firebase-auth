import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("auth-token");
    authToken ? navigate("/home") : navigate("/login");
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    navigate("/login");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
