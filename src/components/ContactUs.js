import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2hm6fqv", // Замените на ваш SERVICE_ID
        "template_htc6dgk", // Замените на ваш TEMPLATE_ID
        form.current,
        "5oF4k_t_-T5Dk_Ap3" // Замените на ваш PUBLIC_KEY
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" name="user_name" />

        <label htmlFor="email">Почта:</label>
        <input type="email" id="email" name="user_email" />

        <label htmlFor="message">Сообщение:</label>
        <textarea id="message" name="message" />

        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};
export default ContactUs; 