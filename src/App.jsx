import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShopProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
            <footer className="mt-auto py-3 bg-light text-center">
              <div className="container">
                <span className="text-muted">
                  Sklep Internetowy &copy; 2026
                </span>
              </div>
            </footer>
          </div>
        </ShopProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
