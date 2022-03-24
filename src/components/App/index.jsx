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
        <Route path="/client" element={<Client />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/admin-konecta" element={<AdminKonecta />} />
        <Route path="/client-edit" element={<ClientEdit />} />
      </Routes>
    </Account>
  );
}

export default App;
