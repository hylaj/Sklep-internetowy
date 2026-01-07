import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useShop } from "../context/ShopContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const { addToCart } = useShop();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      setReviews([
        ...reviews,
        { text: newReview, date: new Date().toLocaleDateString() },
      ]);
      setNewReview("");
    }
  };

  if (!product) return <div className="text-center mt-5">Ładowanie...</div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={5} className="text-center">
          <Image src={product.image} fluid style={{ maxHeight: "400px" }} />
        </Col>
        <Col md={7}>
          <h2>{product.title}</h2>
          <Badge bg="secondary" className="mb-3">
            {product.category}
          </Badge>
          <h3 className="text-primary">${product.price}</h3>
          <p>{product.description}</p>

          <div className="d-flex align-items-center mb-3">
            <Form.Label className="me-3 mb-0">Ilość:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "80px", marginRight: "10px" }}
            />
            <Button
              variant="success"
              onClick={() => {
                addToCart(product, quantity);
                alert("Dodano do koszyka!");
              }}
            >
              Dodaj do koszyka
            </Button>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        <Col>
          <h4>Opinie</h4>
          <Form onSubmit={handleAddReview} className="mb-4">
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Napisz opinię..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="outline-primary" size="sm">
              Dodaj Opinię
            </Button>
          </Form>

          <ListGroup>
            {reviews.length === 0 && (
              <p className="text-muted">Brak opinii. Bądź pierwszy!</p>
            )}
            {reviews.map((rev, idx) => (
              <ListGroup.Item key={idx}>
                <strong>Anonim</strong>{" "}
                <small className="text-muted">{rev.date}</small>
                <p className="mb-0">{rev.text}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
