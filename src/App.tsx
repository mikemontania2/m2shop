import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/producto/:slug" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pedido-confirmado" element={<OrderConfirmation />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/ubicaciones" element={<Locations />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mis-pedidos" element={<MyOrders />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
