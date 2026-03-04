import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import Pricing from './pages/public/Pricing';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RiderSignup from './pages/auth/RiderSignup';
import AdminSignup from './pages/auth/AdminSignup';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Products from './pages/dashboard/Products';
import Orders from './pages/dashboard/Orders';
import Customers from './pages/dashboard/Customers';
import Analytics from './pages/dashboard/Analytics';
import Payments from './pages/dashboard/Payments';
import Coupons from './pages/dashboard/Coupons';
import MarketingTools from './pages/dashboard/MarketingTools';
import AITools from './pages/dashboard/AITools';
import Delivery from './pages/dashboard/Delivery';
import Settings from './pages/dashboard/Settings';
import StoreCustomize from './pages/dashboard/StoreCustomize';
import CustomerStore from './pages/public/CustomerStore';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminSellers from './pages/admin/AdminSellers';
import AdminRiders from './pages/admin/AdminRiders';
import AdminOrders from './pages/admin/AdminOrders';
import AdminRevenue from './pages/admin/AdminRevenue';
import AdminSettings from './pages/admin/AdminSettings';
import AdminPayouts from './pages/admin/AdminPayouts';

// Rider
import RiderLayout from './pages/rider/RiderLayout';
import RiderOverview from './pages/rider/RiderOverview';
import RiderOrders from './pages/rider/RiderOrders';
import RiderEarnings from './pages/rider/RiderEarnings';
import RiderSettings from './pages/rider/RiderSettings';
import RiderRegistration from './pages/rider/RiderRegistration';

import './index.css';
import './components/Modal.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rider-signup" element={<RiderSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* Seller Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="payments" element={<Payments />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="marketing" element={<MarketingTools />} />
          <Route path="ai-tools" element={<AITools />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="store-customize" element={<StoreCustomize />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Super Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="sellers" element={<AdminSellers />} />
          <Route path="riders" element={<AdminRiders />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="revenue" element={<AdminRevenue />} />
          <Route path="payouts" element={<AdminPayouts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Rider Portal */}
        <Route path="/rider" element={<RiderLayout />}>
          <Route index element={<RiderOverview />} />
          <Route path="orders" element={<RiderOrders />} />
          <Route path="earnings" element={<RiderEarnings />} />
          <Route path="settings" element={<RiderSettings />} />
        </Route>

        {/* Rider Registration - public page, no layout */}
        <Route path="/rider/register" element={<RiderRegistration />} />

        {/* Customer Storefront */}
        <Route path="/store/:shopId" element={<CustomerStore />} />
        {/* Legacy shop route redirect */}
        <Route path="/shop/:shopId" element={<Navigate to="/" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
