import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Listado from "./Listado";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div>
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <Listado/>
    </>
  );
};

export default Home;