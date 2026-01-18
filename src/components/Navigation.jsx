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
    // ZMIANA: Usunięto bg="dark" i variant="dark", dodano klasę navbar-custom
    <Navbar expand="lg" className="navbar-custom sticky-top mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-bag-heart-fill me-2"></i>
          OnlineShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link as={Link} to="/">Produkty</Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/orders">Historia Zamówień</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
              <i className="bi bi-cart3 fs-5"></i>
              {cart.length > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="fw-bold text-dark">
                   {user.username}
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="rounded-pill px-3">
                  Wyloguj
                </Button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary rounded-pill px-4">
                Zaloguj
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;