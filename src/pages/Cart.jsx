import { Container, Table, Button, Alert } from "react-bootstrap";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, placeOrder } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    placeOrder();
    alert("Zamówienie złożone pomyślnie!");
    navigate("/orders");
  };

  if (cart.length === 0)
    return (
      <Container className="mt-5 text-center">
        <h3>Twój koszyk jest pusty</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Wróć do sklepu
        </Link>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h2>Twój Koszyk</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Cena</th>
            <th>Ilość</th>
            <th>Suma</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="bi bi-trash"></i> Usuń
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end align-items-center">
        <h4 className="me-4">Razem: ${getCartTotal().toFixed(2)}</h4>
        {user ? (
          <Button variant="success" size="lg" onClick={handleCheckout}>
            Zamów
          </Button>
        ) : (
          <Alert variant="warning" className="mb-0 p-2">
            <Link to="/login">Zaloguj się</Link>, aby złożyć zamówienie.
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default Cart;
