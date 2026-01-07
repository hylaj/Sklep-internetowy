import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container>
      <div className="mb-4">
        <h1>Nasze Produkty</h1>
        <Form.Control
          type="text"
          placeholder="Wyszukaj produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div className="text-center p-3">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "150px", objectFit: "contain" }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="text-muted fw-bold">
                  ${product.price}
                </Card.Text>
                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  variant="primary"
                  className="mt-auto w-100"
                >
                  Szczegóły
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
