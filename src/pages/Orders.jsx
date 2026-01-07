import { Container, Accordion, Table, Badge } from "react-bootstrap";
import { useShop } from "../context/ShopContext";

const Orders = () => {
  const { orders } = useShop();

  return (
    <Container className="mt-4">
      <h2>Historia Zamówień</h2>
      {orders.length === 0 ? (
        <p>Brak zamówień w historii.</p>
      ) : (
        <Accordion defaultActiveKey="0" className="mt-3">
          {orders.map((order, index) => (
            <Accordion.Item eventKey={index.toString()} key={order.id}>
              <Accordion.Header>
                Zamówienie #{order.id} - {order.date} -
                <Badge bg="success" className="ms-2">
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
