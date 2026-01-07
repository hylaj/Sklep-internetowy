import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

const Navigation = () => {
  const { user, logout } = useAuth();
  const { cart } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          OnlineShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Produkty
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/orders">
                Historia Zamówień
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="me-3">
              <i className="bi bi-cart-fill"></i> Koszyk
              {cart.length > 0 && (
                <Badge bg="danger" className="ms-1">
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <div className="d-flex align-items-center text-white">
                <span className="me-2">Witaj, {user.username}!</span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Wyloguj
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login">
                Logowanie
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
