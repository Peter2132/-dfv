import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";


// Компоненты
import ContactUs from "./components/ContactUs";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import FavoritesPage from "./components/FavoritesPage";
import CartPage from "./components/CartPage";
import ProductPage from "./components/ProductPage";
import OrderPage from "./components/OrderPage";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
        console.log("Полученные данные:", data); // Проверка данных
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    };
 
    fetchProducts();
  }, []);

  // Функция для добавления товара в корзину
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Функция для добавления товара в избранное
  const addToFavorites = (product) => {
    setFavoritesItems([...favoritesItems, product]);
  };

  // Функция для удаления товара из корзины
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Функция для удаления товара из избранного
  const removeFromFavorites = (productId) => {
    setFavoritesItems(favoritesItems.filter((item) => item.id !== productId));
  };
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/favorites">Избранное</Link>
              </li>
              <li>
                <Link to="/cart">Корзина</Link>
              </li>
              <li>
                <Link to="/order">Заказ</Link>  
              </li>
              
              
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products.slice(0, 10)} />}
            />
            <Route
              path="/catalog"
              element={
                <CatalogPage
                  products={products}
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favoritesItems={favoritesItems}
                  removeFromFavorites={removeFromFavorites}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductPage
                  products={products}
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                />
              }
            />
            
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/order" element={<OrderPage cartItems={cartItems} />} />
          </Routes>
        </main>

        {/* Добавим кнопку "Обратная связь" в футере */}
        <footer>
          <Link to="/contact">
            <button>Обратная связь</button>
          </Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
