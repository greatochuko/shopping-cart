import CartItem from "./cart-item";
import { useState } from "react";

export default function Cart({
  cartItems,
  setCartItems,
  productList,
  setProductList,
  setCartIsOpen,
}) {
  const [shipping, setShipping] = useState("standard");
  const initialValue = 0;
  const totalPrice =
    cartItems.reduce((a, b) => a + b.price * 100 * b.quantity, initialValue) /
    100;
  let totalCost;
  if (shipping === "standard") {
    totalCost = totalPrice + 5;
  }
  if (shipping === "express") {
    totalCost = totalPrice + 15;
  }

  return (
    <div className="cart">
      <div className="shopping-cart">
        <h3>
          Shopping Cart<span>{cartItems.length} Items</span>
        </h3>
        <hr />
        <div className="header">
          <h4>Product Details</h4>
          <h4>Price</h4>
          <h4>Total</h4>
        </div>
        <ul className="cart-items">
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItems.indexOf(cartItem)}
              setProductList={setProductList}
              productList={productList}
              cartItem={cartItem}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          ))}
        </ul>
        <button
          className="continue-shopping"
          onClick={() => {
            setCartIsOpen(false);
          }}
        >
          &larr; Continue Shopping
        </button>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <hr />
        <p>
          SubTotal ({cartItems.length} items){" "}
          <span>${totalPrice.toFixed(2)}</span>
        </p>
        <div className="add-ons">
          <div className="shipping">
            <label>Shipping</label>
            <select
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="standard">Standard Delivery - $5.00</option>
              <option value="express">Express Delivery - $15.00</option>
            </select>
          </div>
          <form className="promo-form">
            <label>Promo Code</label>
            <input placeholder="Enter your code"></input>
            <button>Apply</button>
          </form>
        </div>
        <hr />
        <p>
          Total cost <span>${totalCost.toFixed(2)}</span>
        </p>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
