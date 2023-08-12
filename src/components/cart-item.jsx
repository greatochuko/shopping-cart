import { useState } from "react";
import Quantity from "./quantity";

export default function CartItem({
  cartItems,
  cartItem,
  setCartItems,
  productList,
  setProductList,
}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const total = (cartItem.price * 100 * cartItem.quantity) / 100;

  const cartItemIndex = cartItems.indexOf(cartItem);
  let newProductList = cartItems.slice();
  newProductList[cartItemIndex] = {
    ...cartItem,
    quantity: quantity,
  };

  function handleIncreaseQuantity() {
    const newQuantity = quantity + 1;
    setQuantity((currQuantity) => currQuantity + 1);
    newProductList[cartItemIndex] = {
      ...cartItem,
      quantity: newQuantity,
    };
    setCartItems(newProductList);
  }

  function handleDecreaseQuantity() {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
    newProductList[cartItemIndex] = {
      ...cartItem,
      quantity: newQuantity,
    };
    setCartItems(newProductList);
  }

  function handleRemoveCartItem(item) {
    setCartItems((formerItems) => formerItems.filter((i) => i !== item));
    let product;
    productList.forEach((p) => {
      if (p.imageURL === item.imageURL) {
        product = p;
        return;
      }
    });
    console.log(product);
    const productIndex = productList.indexOf(product);
    let newProductList = productList.slice();

    newProductList[productIndex] = { ...product, isAdded: false };
    setProductList(newProductList);
  }

  return (
    <li className="cart-item" key={cartItems.indexOf(cartItem)}>
      <div className="details">
        <img src={cartItem.imageURL} alt={cartItem.name} />
        <section>
          <p>{cartItem.name}</p>
          <Quantity
            quantity={quantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
          <button
            className="remove"
            onClick={() => handleRemoveCartItem(cartItem)}
          >
            Remove
          </button>
        </section>
      </div>
      <p className="price">$ {cartItem.price.toFixed(2)}</p>
      <p className="total">$ {total.toFixed(2)}</p>
    </li>
  );
}
