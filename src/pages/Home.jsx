import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner, InputGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories")
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        
        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Logika filtrowania 
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  return (
    <Container>
      {/* Sekcja HERO */}
      <div className="hero-section mb-5">
        <h1 className="hero-title">Zimowa Wyprzedaż do -50%</h1>
        <p className="hero-subtitle">Najlepsze marki, darmowa dostawa od $200 i 30 dni na zwrot.</p>
        <div className="d-flex justify-content-center">
           <InputGroup className="mb-3 shadow-sm" style={{ maxWidth: "500px" }}>
            <InputGroup.Text className="bg-white border-0"><i className="bi bi-search"></i></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Znajdź produkt..."
              className="border-0 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      {/* Pasek Kategorii */}
      <div className="d-flex gap-2 overflow-auto pb-3 mb-4 justify-content-md-center justify-content-start">
        <Button 
          variant={activeCategory === "all" ? "dark" : "outline-secondary"} 
          className="rounded-pill px-4"
          onClick={() => setActiveCategory("all")}
        >
          Wszystkie
        </Button>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "dark" : "outline-secondary"}
            className="rounded-pill px-4 text-capitalize"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      
      {/* Lista Produktów */}
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm product-card border-0">
              <div className="card-img-wrapper position-relative">
                <Card.Img variant="top" src={product.image} />
                <Badge bg="dark" className="position-absolute top-0 start-0 m-3">{product.category}</Badge>
              </div>
              <Card.Body className="d-flex flex-column pt-3">
                <Card.Title className="fs-6 mb-1 text-truncate" title={product.title}>{product.title}</Card.Title>
                <div className="mt-auto d-flex align-items-center justify-content-between">
                  <span className="price-tag">${product.price}</span>
                  <Button as={Link} to={`/product/${product.id}`} variant="primary" size="sm" className="rounded-pill px-3">
                    Szczegóły
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;