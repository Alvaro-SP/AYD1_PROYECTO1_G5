import emailjs from "emailjs-com";

export const sendEmail = async (email, asunto, mensaje) => {
  try {
    const message = await emailjs
      .send(
        "service_qoflz61",
        "template_o5r934h",
        {
          email: "daveangel1lopez@gmail.com",
          asunto: asunto,
          mensaje: mensaje,
        },
        "x0Q07oogmXRaAlig1"
      )
      .promise();

    /* const message = await client.sendAsync({
      text: mensaje,
      from: "jorgecas20000@gmail.com",
      to: "daveangel1lopez@gmail.com",
      subject: asunto,
    }) */

    console.log(message);
  } catch (error) {
    console.error(error);
  }
};
