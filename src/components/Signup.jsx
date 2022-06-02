import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Form, Alert, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, user } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {user && <Navigate to="/listado" />}

      <Container>
        <div className="p-4 box">
          <h2 className="mb-3">Formulario de registro</h2>
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
                Registrarse
              </Button>
            </div>
          </Form>
        </div>
        <div className="p-4 box mt-3 text-center">
          ¿Ya tiene una cuenta? <Link to="/">Ingresa</Link>
        </div>
      </Container>
    </>
  );
};

export default Signup;
