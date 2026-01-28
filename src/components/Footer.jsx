import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-top pt-5 pb-3 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="fw-bold text-primary mb-3">OnlineShop</h5>
            <p className="text-muted small">
              Twój ulubiony sklep internetowy z najlepszymi produktami w sieci. 
              Gwarancja jakości i zadowolenia.
            </p>
            <div className="d-flex gap-3">
              <i className="bi bi-facebook fs-5 text-secondary cursor-pointer"></i>
              <i className="bi bi-instagram fs-5 text-secondary cursor-pointer"></i>
              <i className="bi bi-twitter fs-5 text-secondary cursor-pointer"></i>
            </div>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-bold mb-3">Zakupy</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-muted">Produkty</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-decoration-none text-muted">Koszyk</Link></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Promocje</a></li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h6 className="fw-bold mb-3">Pomoc</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Dostawa</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Zwroty</a></li>
              <li className="mb-2"><Link to="/login" className="text-decoration-none text-muted">Moje Konto</Link></li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <p className="small text-muted">Zapisz się, aby otrzymywać nowości.</p>
            <Form className="d-flex gap-2">
              <Form.Control type="email" placeholder="Twój email" size="sm" />
              <Button variant="dark" size="sm">Zapisz</Button>
            </Form>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center small text-muted">
          &copy; 2026 OnlineShop. Projekt zaliczeniowy.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;