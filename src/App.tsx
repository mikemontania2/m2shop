import type React from "react"
import { AppProvider, useApp } from "./contexts/AppContext"
import { Routes, Route, Outlet } from "react-router-dom"
import Header from "./components/Header"
import MainNav from "./components/header/MainNav"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import CategoryPage from "./pages/CategoryPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CatalogPage from "./pages/CatalogPage"
import MapCoveragePage from "./pages/MapCoveragePage"
import AdminLoginPage from "./pages/AdminLoginPage"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLayout from "./admin/AdminLayout"
import ProductsAdmin from "./admin/ProductsAdmin"
import CategoriesAdmin from "./admin/CategoriesAdmin"
import BannersAdmin from "./admin/BannersAdmin"
import DiscountsAdmin from "./admin/DiscountsAdmin"
import OrdersAdmin from "./admin/OrdersAdmin"
import BranchesAdmin from "./admin/BranchesAdmin"
import CoverageAdmin from "./admin/CoverageAdmin"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import ContactPage from "./pages/ContactPage"
import CompanyPage from "./pages/CompanyPage"
import HistoryPage from "./pages/HistoryPage"
import StoresPage from "./pages/StoresPage"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import LoginPage from "./pages/LoginPage"
import SearchPage from "./pages/SearchPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage" 
import ProtectedRoute, { GuestRoute, ProtectedAdminRoute } from "./ProtectedRoute"

// ========================================
// Toast Container Component
// ========================================
function ToastContainer() {
  const { toasts } = useApp()
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ========================================
// Layout Principal (Ecommerce)
// ========================================
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
  )
}

// ========================================
// App Component
// ========================================
function App() {
  return (
    <AppProvider>
      <Routes>
        {/* ====================================== */}
        {/* RUTAS PÚBLICAS (Ecommerce Layout) */}
        {/* ====================================== */}
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* Catálogo y Productos */}
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo/:subcategoriaSlug" element={<CategoryPage />} />
          <Route path="/:categoriaSlug" element={<CategoryPage />} />
          <Route path="/producto/:slug" element={<ProductDetailPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          
          {/* Carrito y Checkout */}
          <Route path="/carrito" element={<CartPage />} />
          <Route 
            path="/checkout" 
            element={
            /*   <ProtectedRoute> */
                <CheckoutPage />
            /*   </ProtectedRoute> */
            } 
          />
          <Route 
            path="/orden/:id" 
            element={ 
                <OrderConfirmationPage /> 
            } 
          />
          
          {/* Información */}
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/la-empresa" element={<CompanyPage />} />
          <Route path="/nuestra-historia" element={<HistoryPage />} />
          <Route path="/sucursales" element={<StoresPage />} />
          <Route path="/mapa-de-cobertura" element={<MapCoveragePage />} />
          
          {/* Autenticación - Solo para invitados */}
          <Route 
            path="/login" 
            element={
              <GuestRoute redirectTo="/profile">
                <LoginPage />
              </GuestRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <GuestRoute redirectTo="/profile">
                <RegisterPage />
              </GuestRoute>
            } 
          />
          
          {/* Perfil - Requiere autenticación */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* ====================================== */}
        {/* RUTAS DE ADMINISTRACIÓN (Admin Layout) */}
        {/* ====================================== */}
        <Route element={<AdminLayout />}>
          {/* Login de Admin - Solo para invitados */}
          <Route 
            path="/admin/login" 
            element={
              <GuestRoute redirectTo="/admin">
                <AdminLoginPage />
              </GuestRoute>
            } 
          />
          
          {/* Dashboard de Admin - Requiere rol admin */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard onLogout={() => {}} />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Productos Admin */}
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <ProductsAdmin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Categorías Admin */}
          <Route
            path="/admin/categories"
            element={
              <ProtectedAdminRoute>
                <CategoriesAdmin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Banners Admin */}
          <Route
            path="/admin/banners"
            element={
              <ProtectedAdminRoute>
                <BannersAdmin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Descuentos Admin */}
          <Route
            path="/admin/discounts"
            element={
              <ProtectedAdminRoute>
                <DiscountsAdmin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Pedidos Admin */}
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <OrdersAdmin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Sucursales Admin */}
          <Route
            path="/admin/branches"
            element={
              <ProtectedAdminRoute>
                <BranchesAdmin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Cobertura Admin */}
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
  )
}

export default App