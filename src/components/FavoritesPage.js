import React from "react";

function FavoritesPage({ favoritesItems, removeFromFavorites }) {
  return (
    <div>
      <h2>Избранное</h2>
      <ul>
        {favoritesItems.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price} руб.</p>
            <button onClick={() => removeFromFavorites(product.id)}>
              Удалить из избранного
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
