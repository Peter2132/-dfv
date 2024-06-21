import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function ProductPage({ products, addToCart, addToFavorites }) {
  const { id } = useParams(); 
  const product = products.find((p) => p.id === parseInt(id)); 

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{product.name}</h2>
      <motion.img
        src={product.imageUrl}
        alt={product.name}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <p>{product.description}</p>
      <p>Категория: {product.category}</p>
      <p>Цена: {product.price} руб.</p>
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
      <button onClick={() => addToFavorites(product)}>
        Добавить в избранное
      </button>
    </motion.div>
  );
}

export default ProductPage;