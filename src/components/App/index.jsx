import Login from "@/pages/Login";
import Client from "@/pages/Client";
import Product from "@/pages/Product";
import { Account } from "@/components/Account";

function App() {
  return (
    // Se pueden cambiar estos componentes, solo están ahí para verlos despleagados
    <>
      <Client />
      {/* <ProductForm /> */}
      <Account>
        <Login />
        <Product />
      </Account>
    </>
  );
}

export default App;
