import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"; 
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
          {/* Konfiguracja powiadomień */}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <div className="flex-grow-1">
               <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ShopProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;