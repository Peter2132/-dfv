import React from "react";
import { motion } from "framer-motion";
function HomePage({ products }) {
  return (
    <div>
      <h2>Добро пожаловать в наш магазин!</h2>
      <p>
        Здесь вы найдете широкий выбор телефонов по выгодным ценам.
        Просмотрите наш каталог и добавьте понравившиеся товары в корзину.
      </p>

     
      <motion.h3
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        Рекомендуемые товары:
      </motion.h3>

     
      <motion.ul
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        {products.map((product, index) => (
          <motion.li
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }} 
          >
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price} руб.</p>
          </motion.li>
        ))}
      </motion.ul>
      
    </div>
  );
}

export default HomePage;
