import { Container, Accordion, Table, Badge, Alert } from "react-bootstrap";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext"; // Importujemy Auth

const Orders = () => {
  const { orders } = useShop();
  const { user } = useAuth(); // Pobieramy zalogowanego usera

  if (!user) {
    return <Container className="mt-4"><p>Zaloguj się, aby zobaczyć historię.</p></Container>;
  }

  // LOGIKA FILTROWANIA:
  // Jeśli user ma rolę "teacher" (Admin) -> widzi wszystkie zamówienia
  // Jeśli user to student -> widzi tylko zamówienia gdzie order.username == user.username
  const userOrders = user.role === "teacher" 
    ? orders 
    : orders.filter((order) => order.username === user.username);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Historia Zamówień</h2>
        {user.role === "teacher" && <Badge bg="danger">Tryb Administratora</Badge>}
      </div>
      
      {userOrders.length === 0 ? (
        <Alert variant="info">Brak zamówień dla użytkownika: {user.username}</Alert>
      ) : (
        <Accordion defaultActiveKey="0" className="mt-3">
          {userOrders.map((order, index) => (
            <Accordion.Item eventKey={index.toString()} key={order.id}>
              <Accordion.Header>
                {/* Wyświetlamy kto zamówił, jeśli patrzy admin */}
                <span className="me-2 fw-bold">#{index + 1}</span>
                {user.role === "teacher" && <Badge bg="secondary" className="me-2">{order.username}</Badge>}
                {order.date} 
                <Badge bg="success" className="ms-auto">
                  ${order.total.toFixed(2)}
                </Badge>
              </Accordion.Header>
              <Accordion.Body>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th>Ilość</th>
                      <th>Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
};

export default Orders;