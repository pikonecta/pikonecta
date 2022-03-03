import { Route, Routes } from "react-router-dom";
import Client from "@/pages/Client";
import ProductForm from "@/pages/Product";
import GeneralProduct from "@/pages/Product/GeneralProduct";
import AdminKonecta from "@/pages/Admin";
import Pagination from "@/pages/Admin/components/pagination";
import Login from "@/pages/Login";
import { Account } from "../Account";

function App() {
  return (
    <Account>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<Client />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/general" element={<GeneralProduct />} />
        <Route path="/admin-konecta" element={<AdminKonecta />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>
    </Account>
  );
}

export default App;
