export default function Product({
  product,
  handleAddCartItem,
  setProductList,
  productList,
}) {
  const productIndex = productList.indexOf(product);
  let newProductList = productList.slice();

  function handleAddItem() {
    newProductList[productIndex] = { ...product, isAdded: true };
    setProductList(newProductList);
    handleAddCartItem({ ...product, quantity: 1, isAdded: true });
  }

  return (
    <li className="product">
      <div className="img">
        <img src={product.imageURL} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.description?.substring(0, 70)}...</h2>
        <div className="action">
          <p>${product.price}</p>
          {!product.isAdded ? (
            <button onClick={handleAddItem}>Add to cart</button>
          ) : (
            <p className="added">Added to cart</p>
          )}
        </div>
      </div>
    </li>
  );
}
