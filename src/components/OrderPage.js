import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser"; 

function OrderPage({ cartItems }) { 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(false);

  const formRef = useRef(null); 

  const onSubmit = async (data) => {
    
    const orderItems = cartItems.map((item) => `${item.name} (${item.price} руб.)`).join(", ");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    
    try {
      const response = await emailjs.sendForm(
        "service_2hm6fqv", 
        "template_vku9mos", 
        formRef.current, 
        "5oF4k_t_-T5Dk_Ap3", 
        {
          
          orderItems, 
          totalPrice, 
        } 
      );

      if (response.status === 200) {
        setOrderSuccess(true);
        setOrderError(false); 
        console.log("Заказ успешно отправлен!");
        
        setTimeout(() => {
          window.location.reload(); 
        }, 2000); 
      } else {
        setOrderError(true);
        setOrderSuccess(false);
      }
    } catch (error) {
      setOrderError(true);
      setOrderSuccess(false);
      console.error("Ошибка:", error);
    }
  };

  return (
    <div>
      <h2>Оформление заказа</h2>
      {orderSuccess && (
        <div className="success-message">Заказ успешно отправлен! Страница перезагрузится через 2 секунды...</div>
      )}
      {orderError && (
        <div className="error-message">Ошибка при отправке заказа.</div>
      )}

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Имя обязательно</span>}
        </div>
        <div>
          <label htmlFor="address">Адрес:</label>
          <input
            type="text"
            id="address"
            {...register("address", { required: true })}
          />
          {errors.address && <span>Адрес обязателен</span>}
        </div>
        <div>
          <label htmlFor="paymentMethod">Способ оплаты:</label>
          <select id="paymentMethod" {...register("paymentMethod")}>
            <option value="card">Карта</option>
            <option value="cash">Наличные</option>
          </select>
        </div>

        
        <h3>Товары в заказе:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.name} - {item.price} руб.</li>
          ))}
        </ul>
        <p>Общая стоимость: {cartItems.reduce((sum, item) => sum + item.price, 0)} руб.</p>

        <button type="submit">Оформить заказ</button>
      </form>
    </div>
  );
}

export default OrderPage;