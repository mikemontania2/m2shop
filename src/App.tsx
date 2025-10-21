import { AppProvider, useApp } from './contexts/AppContext';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import MainNav from './components/header/MainNav';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CatalogPage from './pages/CatalogPage';
import MapCoveragePage from './pages/MapCoveragePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './admin/AdminLayout';
import ProductsAdmin from './admin/ProductsAdmin';
import CategoriesAdmin from './admin/CategoriesAdmin';
import BannersAdmin from './admin/BannersAdmin';
import DiscountsAdmin from './admin/DiscountsAdmin';
import OrdersAdmin from './admin/OrdersAdmin';
import BranchesAdmin from './admin/BranchesAdmin';
import CoverageAdmin from './admin/CoverageAdmin';
import authService from './services/authService';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import CompanyPage from './pages/CompanyPage';
import HistoryPage from './pages/HistoryPage';
import StoresPage from './pages/StoresPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
 function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';


function Layout() {
  return (
    <div className="app">
      <TopBar />
      <Header />
      <MainNav />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
}

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  if (!authService.isAuthenticated() || !authService.isAdmin()) {
    return <AdminLoginPage onAdminLogin={() => {}} onNavigate={() => {}} />;
  }
  return children;
}

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo/:subcategoriaSlug" element={<CategoryPage />} />
          <Route path="/:categoriaSlug" element={<CategoryPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orden/:id" element={<OrderConfirmationPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/la-empresa" element={<CompanyPage />} />
          <Route path="/nuestra-historia" element={<HistoryPage />} />
          <Route path="/sucursales" element={<StoresPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mapa-de-cobertura" element={<MapCoveragePage />} />
        </Route>

        {/* Admin area isolated from ecommerce chrome */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard onLogout={() => {}} />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <ProductsAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedAdminRoute>
                <CategoriesAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ProtectedAdminRoute>
                <BannersAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/discounts"
            element={
              <ProtectedAdminRoute>
                <DiscountsAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <OrdersAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/branches"
            element={
              <ProtectedAdminRoute>
                <BranchesAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/coverage"
            element={
              <ProtectedAdminRoute>
                <CoverageAdmin />
              </ProtectedAdminRoute>
            }
          />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
