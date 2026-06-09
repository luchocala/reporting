import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import { LocalAuthProvider, useLocalAuth } from '@/lib/LocalAuthContext';

import EntityListPage from './pages/entities/EntityListPage';
import EntityCreatePage from './pages/entities/EntityCreatePage';
import { entitySections } from './config/entitySections';

import Dashboard from './pages/ecommerce/dashboard/Dashboard';
import Users from './pages/original/Users';
import Tasks from './pages/original/Tasks';
import SettingsLayout from './pages/original/settings/SettingsLayout';
import SettingsGeneral from './pages/original/settings/General';
import SettingsBilling from './pages/original/settings/Billing';
import SettingsPlans from './pages/original/settings/Plans';
import SettingsConnectedApps from './pages/original/settings/ConnectedApps';
import SettingsNotifications from './pages/original/settings/Notifications';
import DevOverview from './pages/developers/DevOverview';
import ApiKeys from './pages/developers/ApiKeys';
import Webhooks from './pages/developers/Webhooks';
import EventsLogs from './pages/developers/EventsLogs';
import Dashboard2 from './pages/ecommerce/dashboard/Dashboard2';
import Dashboard3 from './pages/ecommerce/dashboard/Dashboard3';
import Dashboard4 from './pages/ecommerce/dashboard/Dashboard4';
import Dashboard5 from './pages/ecommerce/dashboard/Dashboard5';
import Dashboard6 from './pages/ecommerce/dashboard/Dashboard6';
import Dashboard7 from './pages/ecommerce/dashboard/Dashboard7';
import Dashboard8 from './pages/ecommerce/dashboard/Dashboard8';
import Dashboard9 from './pages/ecommerce/dashboard/Dashboard9';
import Comprobantes from './pages/reporting/Comprobantes';
import Profile from './pages/profile/Profile';

// Ecommerce - Products
import AddProduct from './pages/ecommerce/products/AddProduct';
import AddProduct2 from './pages/ecommerce/products/AddProduct2';
import EditProduct from './pages/ecommerce/products/EditProduct';
import EditProduct2 from './pages/ecommerce/products/EditProduct2';
import ProductDetail1 from './pages/ecommerce/products/ProductDetail1';
import ProductDetail2 from './pages/ecommerce/products/ProductDetail2';
import ProductList1 from './pages/ecommerce/products/ProductList1';
import ProductList2 from './pages/ecommerce/products/ProductList2';
import ProductList3 from './pages/ecommerce/products/ProductList3';
import ProductList4 from './pages/ecommerce/products/ProductList4';

// Ecommerce - Orders
import AddOrder from './pages/ecommerce/orders/AddOrder';
import EditOrder from './pages/ecommerce/orders/EditOrder';
import OrderList1 from './pages/ecommerce/orders/OrderList1';
import OrderList2 from './pages/ecommerce/orders/OrderList2';
import OrderList3 from './pages/ecommerce/orders/OrderList3';
import OrderDetail1 from './pages/ecommerce/orders/OrderDetail1';
import OrderDetail2 from './pages/ecommerce/orders/OrderDetail2';

// Ecommerce - Customers
import AddCustomer from './pages/ecommerce/customers/AddCustomer';
import EditCustomer from './pages/ecommerce/customers/EditCustomer';
import CustomerList1 from './pages/ecommerce/customers/CustomerList1';
import CustomerDetail1 from './pages/ecommerce/customers/CustomerDetail1';

// Ecommerce - Shipments
import AddShipping from './pages/ecommerce/shipments/AddShipping';
import EditShipping from './pages/ecommerce/shipments/EditShipping';
import ShipmentList1 from './pages/ecommerce/shipments/ShipmentList1';
import ShipmentDetail1 from './pages/ecommerce/shipments/ShipmentDetail1';

// Error Pages
import Error401 from './pages/errors/Error401';
import Error403 from './pages/errors/Error403';
import Error404 from './pages/errors/Error404';
import Error500 from './pages/errors/Error500';
import Error503 from './pages/errors/Error503';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
  </div>
);

const ProtectedApp = () => {
  const { user, loading } = useLocalAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard-2" element={<Dashboard2 />} />
        <Route path="/dashboard-3" element={<Dashboard3 />} />
        <Route path="/dashboard-4" element={<Dashboard4 />} />
        <Route path="/dashboard-5" element={<Dashboard5 />} />
        <Route path="/dashboard-6" element={<Dashboard6 />} />
        <Route path="/dashboard-7" element={<Dashboard7 />} />
        <Route path="/dashboard-8" element={<Dashboard8 />} />
        <Route path="/dashboard-9" element={<Dashboard9 />} />

        {/* Órdenes de Facturación */}
        <Route path="/administracion-comercial/ordenes-facturacion" element={<Comprobantes />} />

        {/* Secciones genéricas */}
        {entitySections.map((section) => (
          <Route
            key={section.path}
            path={section.path}
            element={<EntityListPage section={section} />}
          />
        ))}

        {/* Altas genéricas */}
        {entitySections
          .filter((section) => section.createPath)
          .map((section) => (
            <Route
              key={section.createPath}
              path={section.createPath}
              element={<EntityCreatePage section={section} />}
            />
          ))}

        {/* Original - Users & Tasks */}
        <Route path="/users" element={<Users />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />

        {/* Original - Settings */}
        <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<SettingsGeneral />} />
          <Route path="general" element={<SettingsGeneral />} />
          <Route path="billing" element={<SettingsBilling />} />
          <Route path="plans" element={<SettingsPlans />} />
          <Route path="connected-apps" element={<SettingsConnectedApps />} />
          <Route path="notifications" element={<SettingsNotifications />} />
        </Route>

        {/* Developers */}
        <Route path="/developers/overview" element={<DevOverview />} />
        <Route path="/developers/api-keys" element={<ApiKeys />} />
        <Route path="/developers/webhooks" element={<Webhooks />} />
        <Route path="/developers/events-logs" element={<EventsLogs />} />

        {/* Ecommerce - Products */}
        <Route path="/ecommerce/add-product" element={<AddProduct />} />
        <Route path="/ecommerce/add-product-2" element={<AddProduct2 />} />
        <Route path="/ecommerce/edit-product/:id" element={<EditProduct />} />
        <Route path="/ecommerce/edit-product-2/:id" element={<EditProduct2 />} />
        <Route path="/ecommerce/product-detail-1" element={<ProductDetail1 />} />
        <Route path="/ecommerce/product-detail-2" element={<ProductDetail2 />} />
        <Route path="/ecommerce/product-list-1" element={<ProductList1 />} />
        <Route path="/ecommerce/product-list-2" element={<ProductList2 />} />
        <Route path="/ecommerce/product-list-3" element={<ProductList3 />} />
        <Route path="/ecommerce/product-list-4" element={<ProductList4 />} />

        {/* Ecommerce - Orders */}
        <Route path="/ecommerce/add-order" element={<AddOrder />} />
        <Route path="/ecommerce/edit-order/:id" element={<EditOrder />} />
        <Route path="/ecommerce/order-list-1" element={<OrderList1 />} />
        <Route path="/ecommerce/order-list-2" element={<OrderList2 />} />
        <Route path="/ecommerce/order-list-3" element={<OrderList3 />} />
        <Route path="/ecommerce/order-detail-1" element={<OrderDetail1 />} />
        <Route path="/ecommerce/order-detail-2" element={<OrderDetail2 />} />

        {/* Ecommerce - Customers */}
        <Route path="/ecommerce/add-customer" element={<AddCustomer />} />
        <Route path="/ecommerce/edit-customer/:id" element={<EditCustomer />} />
        <Route path="/ecommerce/customer-list-1" element={<CustomerList1 />} />
        <Route path="/ecommerce/customer-detail-1" element={<CustomerDetail1 />} />

        {/* Ecommerce - Shipments */}
        <Route path="/ecommerce/add-shipping" element={<AddShipping />} />
        <Route path="/ecommerce/edit-shipping" element={<EditShipping />} />
        <Route path="/ecommerce/shipment-list-1" element={<ShipmentList1 />} />
        <Route path="/ecommerce/shipment-detail-1" element={<ShipmentDetail1 />} />

        {/* Error pages */}
        <Route path="/errors/401" element={<Error401 />} />
        <Route path="/errors/403" element={<Error403 />} />
        <Route path="/errors/404" element={<Error404 />} />
        <Route path="/errors/500" element={<Error500 />} />
        <Route path="/errors/503" element={<Error503 />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

const PublicRoutes = () => {
  const { user, loading } = useLocalAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/*" element={<ProtectedApp />} />
    </Routes>
  );
};

function App() {
  return (
    <LocalAuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <PublicRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </LocalAuthProvider>
  );
}

export default App;
