import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./PageLayout.css";
function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders &&
          orders.map((order) => (
            <section key={order._id} className="order-card">
              <header className="order-header">
                <h3 className="order-id">Order Id: {order.orderDate}</h3>
              </header>
              <ol className="order-items">
                {order.items.map((item) => (
                  <li key={item._id} className="order-item">
                    <span>
                      {item.name}-{item.price} × {item.quantity}
                    </span>
                    <span className="order-item-total">
                      {item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="order-summary">
                <h3>Order Value: {order.orderValue}</h3>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
export default Orders;