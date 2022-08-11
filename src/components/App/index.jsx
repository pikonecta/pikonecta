import { Route, Routes } from "react-router-dom";
import TenantForm from "@/pages/TenantForm";
import ProductForm from "@/pages/ProductForm";
import Admin from "@/pages/Admin";
import ProductList from "@/pages/ProductList";
import Login from "@/pages/Login";
import { AccountProvider } from "@/contexts/Account";
import Checkout from "@/pages/Checkout";
import PrivateRoute from "../PrivateRoute";
import SideBarShop from "../SideBarShop";

function App() {
  return (
    <AccountProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/:id/" element={<ProductList />} />
        <Route path="/:id/side" element={<SideBarShop />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredGroup="admin">
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <PrivateRoute requiredGroup="admin">
              <TenantForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <PrivateRoute requiredGroup="admin">
              <TenantForm canEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/create"
          element={
            <PrivateRoute requiredGroup="client">
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/update/:idProduct"
          element={
            <PrivateRoute requiredGroup="client">
              <ProductForm canEdit />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </AccountProvider>
  );
}

export default App;
