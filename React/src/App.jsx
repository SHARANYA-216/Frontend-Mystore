import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Login from './components/Login';
import Register from "./components/Register"
import Cart from "./components/Cart"
import Orders from "./components/Orders"
import Logout from "./components/Logout"

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Content />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}
export default App;
