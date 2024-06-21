import React from "react";

function CartPage({ cartItems, removeFromCart }) {
  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div>
      <h2>Корзина</h2>
      <ul>
        {cartItems.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price} руб.</p>
            <button onClick={() => removeFromCart(product.id)}>
              Удалить из корзины
            </button>
          </li>
        ))}
      </ul>
      <h3>Итого: {totalPrice} руб.</h3>
    </div>
  );
}

export default CartPage;
