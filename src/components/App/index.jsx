import { Route, Routes } from "react-router-dom";
import Client from "@/pages/Client";
import ProductForm from "@/pages/Product";
import AdminKonecta from "@/pages/Admin";
import ClientEdit from "@/pages/ClientEdit";
import Login from "@/pages/Login";
import { AccountProvider } from "@/contexts/Account";
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
    <AccountProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/:id/" element={<ClientEdit />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredGroup="admin">
              <AdminKonecta />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <PrivateRoute requiredGroup="admin">
              <Client />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <PrivateRoute requiredGroup="admin">
              <Client canEdit />
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
      </Routes>
    </AccountProvider>
  );
}

export default App;
