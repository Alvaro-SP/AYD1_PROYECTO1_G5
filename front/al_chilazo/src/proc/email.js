import emailjs from "emailjs-com";

export const sendEmail = async (email, asunto, mensaje) => {
  try {
    emailjs.send('service_qoflz61', 'template_o5r934h', {
      email: email,
      asunto: asunto,
      mensaje: mensaje
    }, 'x0Q07oogmXRaAlig1') //email.js
      .then((result) => {
        console.log(result)
      }, (error) => {
        console.log(error.text);
      });

    /* console.log(message); */
  } catch (error) {
    console.error(error);
  }
};
