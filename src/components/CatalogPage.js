import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

function CatalogPage({ products, addToCart, addToFavorites }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState(""); // Состояние для сортировки

  // Фильтрация товаров по поисковому запросу
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Фильтрация товаров по категории
  const categoryFilteredProducts =
    selectedCategory !== ""
      ? filteredProducts.filter(
          (product) => product.category === selectedCategory
        )
      : filteredProducts;

  // Сортировка товаров
  const sortedProducts = categoryFilteredProducts.sort((a, b) => {
    if (sortOption === "price_desc") {
      return b.price - a.price;
    } else if (sortOption === "price_asc") {
      return a.price - b.price;
    } else if (sortOption === "name_asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name_desc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <h2>Каталог товаров</h2>
      <div>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Без сортировки</option>
          <option value="price_desc">Цена (от большего к меньшему)</option>
          <option value="price_asc">Цена (от меньшего к большему)</option>
          <option value="name_asc">Название (от А до Я)</option>
          <option value="name_desc">Название (от Я до А)</option>
        </select>
      </div>
      <motion.ul
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        {sortedProducts.map((product) => (
          <motion.li
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            >
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price} руб.</p>

            <Link to={`/product/${product.id}`}> 
              <button>О товаре</button> {/* Кнопка "О товаре" */}
            </Link>

            <button onClick={() => addToCart(product)}>
              Добавить в корзину
            </button>
            <button onClick={() => addToFavorites(product)}>
              Добавить в избранное
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default CatalogPage;