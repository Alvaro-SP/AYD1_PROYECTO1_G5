import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function PedidosAsignados() {
  const [esconder, setEsconder] = useState(false);
  const [pedidosGeneral, setListadoGeneral] = useState([]);
  const [pedidosPart, setPedidosPart] = useState([]);
  const [cantPages, setCantPages] = useState([]);
  const [pedidoEnCurso, setPedidoCurso] = useState(undefined);
  const [idCurso, setIdCurso] = useState("");
  const [dateCurso, setDateCurso] = useState("");
  const [totalCurso, setTotalCurso] = useState("");
  const [addressCurso, setAddressCurso] = useState("");
  const [payment, setPaymentCurso] = useState("");
  const [nameCurso, setNameCurso] = useState("");
  const [mailCurso, setMailCurso] = useState("");
  const [comisionTotal, setComisionTotal] = useState(0);

  useEffect(() => {
    getPedidosRepartidorCompleto();

    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 250,
      outDuration: 250,
    });
  }, []);

  const getPedidosRepartidorCompleto = async () => {
    const data = {
      id: 1,
    };

    try {
      const result = (
        await axios.post(url + "historialpedidos-repartidor", data)
      ).data;
      if (result.res) {
        setComisionTotal(result.comisiontotal);
        setListadoGeneral(result.res.filter((pedido) => pedido.state === 0));
        setPedidoCurso(result.res.filter((pedido) => pedido.state === 1)[0]);

        if (pedidoEnCurso) {
          setIdCurso(pedidoEnCurso.id);
          setDateCurso(pedidoEnCurso.date);
          setTotalCurso(pedidoEnCurso.total_price);
          setAddressCurso(pedidoEnCurso.address);
          setPaymentCurso(pedidoEnCurso.payment_method);
          setNameCurso(pedidoEnCurso.name_user);
          setMailCurso(pedidoEnCurso.mail_user);
          setEsconder(true);
        }

        let numPages = [];
        for (let i = 1; i <= pedidosGeneral.length / 5; i++) {
          numPages.push(i);
        }

        if (pedidosGeneral.length % 5 !== 0) {
          numPages.push(numPages.length + 1);
        }

        setCantPages(numPages);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const completarPedido = async () => {
    const data = {
      id: idCurso,
    };

    try {
      const result = (await axios.post(url + "entregarpedido-repartidor", data))
        .data;
      console.log(result);

      if (result.res) {
        setEsconder(false);
        setListadoPedidos([...listadoPedidos, pedidoCurso]);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const paginarPedidos = (index) => {
    let seccionPedido = [];
    for (let i = (index - 1) * 5; i < index * 5; i++) {
      if (i < pedidosGeneral.length) {
        seccionPedido.push(pedidosGeneral[i]);
      }
    }
    setPedidosPart(seccionPedido);
  };

  useEffect(() => {
    paginarPedidos(1);
  }, [pedidosGeneral]);

  useEffect(() => {
  }, [pedidosPart])

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="green-text text-darken-3 center-align">
                PEDIDOS ASIGNADOS
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            {esconder && (
              <div className="card horizontal hoverable">
                <div className="card-image">
                  <img
                    src="https://fulfillment.shiprocket.in/wp-content/uploads/2023/03/nextDayDeliveryBanner-min.png"
                    alt=""
                    className="responsive-img"
                    /* width={"225px"}
                    height={"250px"} */
                  />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <div className="col s6">
                      <p>
                        ID Pedido: {idCurso} <br />
                        <br />
                        Receptor: {nameCurso} <br />
                        <br />
                        Correo: {mailCurso} <br />
                        <br />
                        Total: Q{totalCurso} <br />
                      </p>
                    </div>
                    <div className="col s6">
                      <p>
                        Fecha: {dateCurso} <br />
                        <br />
                        Direccion: {addressCurso} <br />
                        <br />
                        Forma De Pago: {payment} <br />
                      </p>
                    </div>
                  </div>
                  <div className="card-action center-content">
                    <a
                      href="#"
                      className="green-text text-darken-3 center-content"
                      onClick={completarPedido}
                    >
                      <i className="material-icons left">done_all</i>COMPLETAR
                      PEDIDO
                    </a>
                  </div>
                </div>
              </div>
            )}

            {!esconder && (
              <div className="card horizontal hoverable" style={{display: "flex", alignItems: "center"}}>
                <div className="card-image">
                  <img
                    src="https://pbs.twimg.com/media/FJLhLupVIAAUpJV.jpg"
                    alt=""
                    className="responsive-img"
                  />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <blockquote>
                      <h4>No Hay Pedidos Por Entregar</h4>
                    </blockquote>
                  </div>
                </div>
              </div>
            )}
          </div>
          <br />
          <div className="row">
            <h4 className="green-text text-darken-3 center-align">
              PEDIDOS COMPLETADOS
            </h4>
            <div className="divider"></div>
            <br />
            <div className="row center-content borderComision">
              <div className="col s1 center-content">
                <i className="material-icons hide-on-med-and-down medium green-text text-darken-3">
                  paid
                </i>
              </div>
              <div className="col s10 center-align">
                <h4>Comisiones Generadas:&nbsp;Q{comisionTotal}</h4>
              </div>
              <div className="col s1 center-content">
                <i className="material-icons hide-on-med-and-down medium green-text text-darken-3">
                  paid
                </i>
              </div>
            </div>
            <div className="container">
              <ul className="collapsible popout">
                {pedidosPart.map((pedidoC, index) => {
                  return (
                    <li key={index}>
                      <div className="collapsible-header">
                        <i className="material-icons">all_inbox</i>PEDIDO:{" "}
                        {pedidoC.id} -- Fecha: {pedidoC.date}
                      </div>
                      <div className="collapsible-body">
                        <div className="row">
                          <div className="col s6">
                            <p>
                              ID Pedido: {pedidoC.id} <br />
                              <br />
                              Receptor: {pedidoC.name_user} <br />
                              <br />
                              Total: Q{pedidoC.total_price} <br />
                              <br />
                              Comision: Q{pedidoC.comision}
                            </p>
                          </div>
                          <div className="col s6">
                            <p>
                              Direccion: {pedidoC.address} <br />
                              <br />
                              Correo: {pedidoC.mail_user} <br />
                              <br />
                              Forma De Pago: {pedidoC.payment_method} <br />
                              <br />
                              Calificacion: {pedidoC.rate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <br />
              <ul
                className="pagination"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <li
                  className="waves-effect waves-green hoverable"
                  style={{ flexGrow: "1" }}
                >
                  <a href="#!" onClick={() => paginarPedidos(1)}>
                    <i className="material-icons">chevron_left</i>
                  </a>
                </li>
                {cantPages.map((page, index) => {
                  <li
                    className="waves-effect waves-red hoverable"
                    style={{ flexGrow: "1" }}
                    key={index}
                  >
                    <a href="#!" onClick={() => paginarPedidos(page)}>{page}</a>
                  </li>;
                })}
                <li
                  className="waves-effect waves-green hoverable"
                  style={{ flexGrow: "1" }}
                >
                  <a href="#!"  onClick={() => paginarPedidos(cantPages[cantPages.length - 1])}>
                    <i className="material-icons">chevron_right</i>
                  </a>
                </li>
              </ul>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
