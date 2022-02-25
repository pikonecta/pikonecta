import { Route, Routes } from "react-router-dom";

import Client from "@/pages/Client";
import Login from "@/pages/Login/Login";
import ProductForm from "@/pages/Product";
import AdminKonecta from "@/pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/client" element={<Client />} />
      <Route path="/product" element={<ProductForm />} />
      <Route path="/admin-konecta" element={<AdminKonecta />} />
    </Routes>
  );
}

export default App;
