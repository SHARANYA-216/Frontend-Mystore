import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  // const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const { user, setUser, cart, setCart } = useContext(AppContext);

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    card.style.setProperty("--mouse-x", `${xPercent}%`);
    card.style.setProperty("--mouse-y", `${yPercent}%`);
    card.style.setProperty("--x", `${xPercent}%`);
    card.style.setProperty("--y", `${yPercent}%`);
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
  };

  const fetchProducts = async () => {
    const url = `${API_URL}/store`;
    const res = await axios.get(url);
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.quantity = 1;
      setCart([...cart,product]);
    }
  };

  return (
    <div className="content-page">
      <div className="chroma-grid">
        {products.map((product) => (
          <article
            key={product._id}
            className="chroma-card"
            onPointerMove={handleCardMove}
            onPointerLeave={handleCardLeave}
          >
            <div className="chroma-img-wrapper">
              <img
                src={`${API_URL}/${product.imageUrl}`}
                alt={product.name}
                loading="lazy"
              />
            </div>

            <div className="chroma-info">
              <h3>{product.name}</h3>
              <h4>{product.price}</h4>
              <p className="role">{product.desc}</p>
              <p className="handle">Rating: {product.rating}</p>
              <p className="chroma-action">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </p>
            </div>

            <div className="chroma-overlay" aria-hidden="true" />
            <div className="chroma-fade" aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}
export default Content;