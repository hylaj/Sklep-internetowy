import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  ListGroup,
  Badge,
  Alert,
  Spinner
} from "react-bootstrap";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Komponent pomocniczy do wyświetlania gwiazdek
const StarRating = ({ count }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`bi ${
            i < count ? "bi-star-fill text-warning" : "bi-star text-muted"
          } me-1`}
        ></i>
      ))}
    </>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Stany dla systemu opinii
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { addToCart } = useShop();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    //  Pobranie danych produktu
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Pobranie opinii z LocalStorage 
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews([]);
    }
  }, [id]);

  const handleAddToCart = () => {
    // walidacja ilości magazynowej
    if (product.rating.count < quantity) {
        toast.error(`Mamy tylko ${product.rating.count} sztuk tego produktu!`);
        return;
    }

    addToCart(product, quantity);
    toast.success(
      <span>
        Dodano <b>{product.title.substring(0, 20)}...</b> do koszyka!
      </span>
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Musisz być zalogowany!");
      return;
    }

    // Walidacja: Czy użytkownik już dodał opinię?
    if (reviews.some((r) => r.username === user.username)) {
      setError("Możesz dodać tylko jedną opinię do tego produktu.");
      toast.error("Już oceniłeś ten produkt.");
      return;
    }

    // Walidacja pól
    if (!newReviewText.trim() || !email.trim()) {
      setError("Wypełnij treść opinii i email.");
      return;
    }

    const newReview = {
      username: user.username,
      email: email,
      text: newReviewText,
      rating: parseInt(rating),
      date: new Date().toLocaleDateString(),
    };

    // Aktualizacja stanu i zapis do localStorage
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    // Reset formularza
    setNewReviewText("");
    setEmail("");
    setError("");
    toast.success("Opinia dodana pomyślnie!");
  };

  // Odpowiada za logikę usuwania komentarza z listy i z pamięci przeglądarki
  const handleDeleteReview = (reviewIndex) => {
    // Filtrujemy tablicę, usuwając element o konkretnym indeksie
    const updatedReviews = reviews.filter((_, index) => index !== reviewIndex);
    
    // Aktualizujemy stan i localStorage
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    
    toast.success("Opinia została usunięta.");
  };

  if (loading || !product)
    return (
      <Container className="text-center mt-5" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  return (
    <Container className="mt-5 pb-5">
      {/* Przycisk powrotu */}
      <Link to="/" className="text-decoration-none text-secondary mb-4 d-inline-block">
        <i className="bi bi-arrow-left me-2"></i>Wróć do sklepu
      </Link>

      <Row>
        {/* Kolumna ze zdjęciem */}
        <Col md={6} className="mb-4 text-center bg-white rounded-4 p-5 shadow-sm">
          <Image
            src={product.image}
            fluid
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </Col>

        {/* Kolumna z opisem */}
        <Col md={6} className="ps-md-5">
          <div className="d-flex justify-content-between align-items-start">
             <Badge bg="dark" className="mb-2 text-uppercase tracking-wide">
                {product.category}
             </Badge>
             
             {/* Wyświetlanie dostępnej ilości */}
             <Badge bg={product.rating.count > 50 ? "success" : "danger"} className="mb-2">
                <i className="bi bi-box-seam me-1"></i>
                Dostępna ilość: {product.rating.count} szt.
             </Badge>
          </div>

          <h2 className="fw-bold mb-3">{product.title}</h2>
          
          <div className="d-flex align-items-center mb-3">
             <h3 className="text-primary fw-bold mb-0 me-3">${product.price}</h3>
             <div className="text-warning small">
                <StarRating count={Math.round(product.rating.rate)} /> 
                <span className="text-muted ms-1">
                    ({product.rating.rate} / {product.rating.count} ocen)
                </span>
             </div>
          </div>

          <p className="text-muted leading-relaxed">{product.description}</p>

          {/* Sekcja Trust Signals */}
          <div className="d-flex gap-4 my-4 py-3 border-top border-bottom bg-light px-3 rounded-3">
            <div className="d-flex align-items-center text-dark">
              <i className="bi bi-truck fs-4 me-2 text-primary"></i>
              <div style={{ lineHeight: "1.2" }}>
                <small className="fw-bold d-block">Darmowa</small>
                <small className="text-muted" style={{ fontSize: "0.8rem" }}>Dostawa</small>
              </div>
            </div>
            <div className="d-flex align-items-center text-dark">
              <i className="bi bi-shield-check fs-4 me-2 text-primary"></i>
               <div style={{ lineHeight: "1.2" }}>
                <small className="fw-bold d-block">2 lata</small>
                <small className="text-muted" style={{ fontSize: "0.8rem" }}>Gwarancji</small>
              </div>
            </div>
            <div className="d-flex align-items-center text-dark">
              <i className="bi bi-arrow-counterclockwise fs-4 me-2 text-primary"></i>
               <div style={{ lineHeight: "1.2" }}>
                <small className="fw-bold d-block">30 dni</small>
                <small className="text-muted" style={{ fontSize: "0.8rem" }}>Zwrotu</small>
              </div>
            </div>
          </div>

          {/* Sekcja Dodawania do Koszyka */}
          <div className="d-flex align-items-center mb-3">
            <Form.Group className="me-3">
               <Form.Label className="visually-hidden">Ilość</Form.Label>
               <Form.Control
                type="number"
                min="1"
                max={product.rating.count} // Ograniczenie inputa do max stanu
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: "80px", textAlign: "center" }}
                className="fw-bold"
              />
            </Form.Group>
            
            <Button
              variant="primary"
              size="lg"
              className="px-5 rounded-pill shadow-sm flex-grow-1"
              onClick={handleAddToCart}
              disabled={product.rating.count === 0} // Blokada jeśli brak towaru
            >
              {product.rating.count > 0 ? (
                 <><i className="bi bi-bag-plus me-2"></i> Do Koszyka</>
              ) : (
                 "Wyprzedane"
              )}
            </Button>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      {/* Sekcja Opinii */}
      <Row className="justify-content-center">
        <Col lg={8}>
          <h4 className="fw-bold mb-4">Opinie o produkcie ({reviews.length})</h4>

          {/* Formularz dodawania opinii (Tylko dla zalogowanych) */}
          {user ? (
            <div className="bg-light p-4 rounded-4 mb-5 border shadow-sm">
              <h5 className="mb-3">Dodaj swoją opinię</h5>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleAddReview}>
                <Row>
                   <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small text-muted">Twój Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                        />
                      </Form.Group>
                   </Col>
                   <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small text-muted">Twoja Ocena</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="text-warning fw-bold"
                        >
                          <option value="5" className="text-dark">★★★★★ (5/5) - Rewelacja</option>
                          <option value="4" className="text-dark">★★★★☆ (4/5) - Dobry</option>
                          <option value="3" className="text-dark">★★★☆☆ (3/5) - Przeciętny</option>
                          <option value="2" className="text-dark">★★☆☆☆ (2/5) - Słaby</option>
                          <option value="1" className="text-dark">★☆☆☆☆ (1/5) - Tragiczny</option>
                        </Form.Select>
                      </Form.Group>
                   </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted">Treść opinii</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Podziel się wrażeniami z zakupu..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <div className="text-end">
                   <Button type="submit" variant="dark" className="rounded-pill px-4">
                     Opublikuj Opinię
                   </Button>
                </div>
              </Form>
            </div>
          ) : (
            <Alert variant="info" className="d-flex align-items-center shadow-sm">
              <i className="bi bi-info-circle-fill fs-4 me-3"></i>
              <div>
                 Chcesz dodać opinię? <Link to="/login" className="fw-bold">Zaloguj się</Link>, aby ocenić ten produkt.
              </div>
            </Alert>
          )}

          {/* Lista Opinii */}
          <ListGroup variant="flush">
            {reviews.length === 0 && (
              <div className="text-center py-5 text-muted bg-light rounded-3">
                 <i className="bi bi-chat-square-dots fs-1 mb-2 d-block"></i>
                 Brak opinii. Bądź pierwszy!
              </div>
            )}
            
            {reviews.map((rev, idx) => (
              <ListGroup.Item key={idx} className="bg-transparent border-bottom py-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                     <strong className="d-block">
                        {rev.username}
                        {user && user.username === rev.username && " (Ty)"}
                     </strong>
                     <small className="text-muted">{rev.email}</small>
                  </div>

                  {}
                  <div className="d-flex align-items-center gap-3">
                    <small className="text-muted">{rev.date}</small>
                    
                    {/* Przycisk usuwania opinii */}
                    {user && (user.role === "teacher" || user.username === rev.username) && (
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleDeleteReview(idx)}
                        title="Usuń opinię"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    )}
                  </div>
                  {/* -------------------------------------- */}

                </div>
                <div className="mb-2">
                  <StarRating count={rev.rating} />
                </div>
                <p className="mb-0 text-secondary">{rev.text}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;