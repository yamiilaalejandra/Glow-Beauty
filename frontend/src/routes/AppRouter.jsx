import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import Confirmation from "../pages/Confirmation";
import Accessories from "../pages/Accessories";
import AccessoryDetail from "../pages/AccessoryDetail";
import SearchResults from "../pages/SearchResults";
import AdminLogin from "../pages/AdminLogin";
import AdminPanel from "../pages/AdminPanel";
import AdminOrders from "../pages/AdminOrders";

const getAuthenticated = () => Boolean(localStorage.getItem('user'));
const getAdminAuthenticated = () => sessionStorage.getItem('adminAuthenticated') === 'true';

const PublicRoute = ({ children }) => {
  return getAuthenticated() ? <Navigate to="/products" replace /> : children;
};

const PrivateRoute = ({ children }) => {
  return getAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AdminPublicRoute = ({ children }) => {
  return getAdminAuthenticated() ? <Navigate to="/admin" replace /> : children;
};

const AdminPrivateRoute = ({ children }) => {
  return getAdminAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

const AuthFooter = () => {
  const { pathname } = useLocation();

  if (!getAuthenticated()) return null;
  if (pathname === "/login" || pathname === "/register") return null;

  return <Footer />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            getAdminAuthenticated() ? (
              <Navigate to="/admin" replace />
            ) : getAuthenticated() ? (
              <Navigate to="/products" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/admin/login" element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route path="/admin" element={<AdminPrivateRoute><AdminPanel /></AdminPrivateRoute>} />
        <Route path="/admin/ordenes" element={<AdminPrivateRoute><AdminOrders /></AdminPrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/accessories" element={<PrivateRoute><Accessories /></PrivateRoute>} />
        <Route path="/accessory/:id" element={<PrivateRoute><AccessoryDetail /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/confirmation" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
      </Routes>
      <AuthFooter />
    </BrowserRouter>
  );
};

export default AppRouter;