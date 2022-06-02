import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Form, Alert, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/listado");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/listado");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {user && <Navigate to="/listado" />}

      <Container>
        <div className="p-4 box">
          <h2 className="mb-3">Formulario de ingreso</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Ingresar
              </Button>
            </div>
          </Form>
          <hr />
          <div>
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
        </div>
        <div className="p-4 box mt-3 text-center">
          ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
        </div>
      </Container>
    </>
  );
};

export default Login;
