import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./PageLayout.css";
function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const increment = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };
  const decrement = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      }),
    );
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0),
    );
  }, [cart]);

  const placeOrder = async () => {
    if (user?.email) {
      const url = `${API_URL}/orders`;
      const order = {
        email: user.email,
        items: cart,
        orderValue: orderValue,
        orderDate: Date.now(),
      };
      console.log(url, order);
      const response = await axios.post(url, order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart([]);
      Navigate("/orders");
    }
  };

  return (
    <div className="page">
      <h1>My Cart</h1>
      <ol className="cart-list">
        {cart &&
          cart.map((item) => (
            <li key={item._id} className="cart-item">
              <span>
                {item.name}-{item.price}
              </span>
              <span className="cart-qty">
                <button
                  className="btn btn--icon"
                  onClick={() => decrement(item._id)}
                  aria-label={`Decrease ${item.name}`}
                >
                  -
                </button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button
                  className="btn btn--icon"
                  onClick={() => increment(item._id)}
                  aria-label={`Increase ${item.name}`}
                >
                  +
                </button>
              </span>
              <strong>{item.quantity * item.price}</strong>
            </li>
          ))}
      </ol>
      <p>
        <strong>Order Value:{orderValue}</strong>
      </p>
      <p>
        {user?.email ? (
          <button className="btn btn--primary" onClick={placeOrder}>
            Place Order
          </button>
        ) : (
          <button className="btn btn--primary" onClick={() => Navigate("/login")}>
            Login to Order
          </button>
        )}
      </p>
    </div>
  );
}
export default Cart;