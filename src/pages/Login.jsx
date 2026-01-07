import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Przełącznik logowanie/rejestracja
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      register(username, password);
      alert("Konto utworzone! Zaloguj się.");
      setIsRegister(false);
    } else {
      const success = login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError("Nieprawidłowa nazwa użytkownika lub hasło");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            {isRegister ? "Rejestracja" : "Logowanie"}
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              {isRegister ? "Utwórz konto" : "Zaloguj się"}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <br />
            <Button
              variant="link"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
            >
              {isRegister
                ? "Masz konto? Zaloguj się"
                : "Nie masz konta? Zarejestruj się"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
