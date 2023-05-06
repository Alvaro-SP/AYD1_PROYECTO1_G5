import React, { useState, useEffect } from "react";
import { url } from "../../shared/url";
import axios from "axios";
export default function Reporte() {
  const [listado, setListado] = useState([]);
  const [listado2, setListado2] = useState([]);
  const [nombre, setNombre] = useState("");
    const [venta,setVenta] = useState(0);
    const [fecha,setFecha] = useState(0);
  useEffect(() => {
    getData();
    M.AutoInit();
  }, []);

  const getData = async () => {
    var data = {
      id: JSON.parse(localStorage.getItem("user")).id 
    };
    try {
      const result = (
        await axios.post(url + "reportef", data)
      ).data;
      console.log(result);

      if (result.res) {
        setListado(result.res);
        setListado2(result.top.sort((a,b)=> b.cant-a.cant))
        setVenta(result.comisiontotal)
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

  const agregar = async () => {
    const data = {
      id: JSON.parse(localStorage.getItem("user")).id ,
      fecha:fecha
    };
    console.log(data);
    try {
      const result = (
        await axios.post(url + "reportef2", data)
      ).data;
      console.log(result);

      if (result.res) {
        setListado(result.res);
        setListado2(result.top.sort((a,b)=> b.cant-a.cant))
        setVenta(result.comisiontotal)
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
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1 className="center-align">Reporte</h1>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s8 offset-s2">
            <i className="material-icons prefix">filter_alt</i>
            <input type="date" onChange={(e)=> setFecha(e.target.value)}></input>
            <label>Buscar por fecha
            </label>
          </div>
          <a className="waves-effect waves-light btn"><i className="material-icons" onClick={agregar}>search</i></a>
        </div>

        <div className="row">
            <h1>Venta</h1><h4>{venta}</h4>
        </div>
        <div className="row">
            <div className="container">
            <h1>Pedidos</h1>
            </div>
          <table className="centered highlight grey lighten-4">
            <thead className="red darken-1 white-text">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Direccion</th>
                <th>Metodo de pago</th>
                <th>Rate</th>
                <th>Precio</th>
              </tr>
            </thead>

            <tbody>
              {listado.map((cate) => {
                return (
                  <tr key={cate.id}>
                    <td>{cate.id}</td>
                    <td>{cate.name_user}</td>
                    <td>{cate.mail_user}</td>
                    <td>{cate.address}</td>
                    <td>{cate.payment_method}</td>
                    <td>{cate.rate}</td>
                    <td>{cate.total_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
            <div className="container">
            <h1>Top productos</h1>
            </div>
          <table className="centered highlight grey lighten-4">
            <thead className="red darken-1 white-text">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>

            <tbody>
              {listado2.map((cate) => {
                return (
                  <tr key={cate.id}>
                    <td>{cate.id}</td>
                    <td>{cate.name}</td>
                    <td>{cate.cant}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
