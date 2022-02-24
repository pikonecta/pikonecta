import Login from "@/pages/Login";
import Client from "@/pages/Client";
import { Route, Routes } from "react-router-dom";
import ProductForm from "@/pages/Product";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/client" element={<Client />} />
      <Route path="/product" element={<ProductForm />} />
    </Routes>
  );
}

export default App;
