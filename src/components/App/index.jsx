import { Route, Routes } from "react-router-dom";
import Client from "@/pages/Client";
import ProductForm from "@/pages/Product";
import AdminKonecta from "@/pages/Admin";
import ClientEdit from "@/pages/ClientEdit";
import Login from "@/pages/Login";
import { Account } from "../Account";

function App() {
  return (
    <Account>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminKonecta />} />
        <Route path="/admin/create" element={<Client />} />
        <Route path="/admin/update/:id" element={<Client canEdit />} />
        <Route path="/:id/" element={<ClientEdit canEdit />} />
        <Route path="/:id/create" element={<ProductForm />} />
        <Route
          path="/:id/update/:idProduct"
          element={<ProductForm canEdit />}
        />
      </Routes>
    </Account>
  );
}

export default App;
