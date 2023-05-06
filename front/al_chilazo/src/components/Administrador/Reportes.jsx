import { useEffect, useState } from "react";
import "../../styles/Administrador/reportes.css";
import { url } from "../../shared/url";
import axios from "axios";

export function Reportes() {
  const [dataC1, setData1] = useState({
    tab1: [],
    tab2: [],
    tab3: [],
    tab4: [],
  });
  const [dataC2, setData2] = useState({
    tab1: [],
    tab2: [],
    tab3: [],
  });
  const [dataC3, setData3] = useState({
    tab1: [],
    tab2: [],
    tab3: [],
  });

  useEffect(() => {
    const pedirDatos = async () => {
      await getEmpresas();
      await getUsers();
      await getRepartidores();
    };

    pedirDatos();

    var elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems, {
      fullWidth: true,
      dist: 25,
    });

    var elem = document.querySelectorAll(".tabs");
    M.Tabs.init(elem, {
      duration: 100,
    });

    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
    });
  }, []);

  const next = () => {
    var elem = document.getElementById("carouselReportes");
    var instance = M.Carousel.getInstance(elem);
    instance.next();
  };

  const prev = async () => {
    var elem = document.getElementById("carouselReportes");
    var instance = M.Carousel.getInstance(elem);
    instance.prev();
  };

  const getUsers = async () => {
    try {
      const result = (await axios.get(url + "getReportsUsers")).data;
      console.log(result);
      if (result.res) {
        setData1(result.res);
        console.log(result.res);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-3",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-3",
      });
    }
  };

  const getRepartidores = async () => {
    try {
      const result = (await axios.get(url + "getReportsRepartidores")).data;
      console.log(result);
      if (result.res) {
        setData2(result.res);
        console.log(result.res);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-3",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-3",
      });
    }
  };

  const getEmpresas = async () => {
    try {
      const result = (await axios.get(url + "getReportsEmpresas")).data;
      console.log(result);
      if (result.res) {
        setData3(result.res);
        console.log(result.res);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-3",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-3",
      });
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2 className="red-text text-darken-3 center-align">REPORTES</h2>
            <div className="divider"></div>
          </div>
        </div>
      </div>
      <div
        className="carousel carousel-slider center"
        style={{ height: "475px" }}
        id="carouselReportes"
      >
        <div className="carousel-fixed-item center">
          <div className="row">
            <div className="col s1 offset-s5">
              <a
                href="#!"
                className="waves-effect waves-light btn indigo darken-4 center tooltipped"
                data-position="top"
                data-tooltip="Prev"
                onClick={prev}
              >
                <i className="material-icons">arrow_back</i>
              </a>
            </div>
            <div className="col s1">
              <a
                href="#!"
                className="waves-effect waves-light btn indigo darken-4 center tooltipped"
                data-position="top"
                data-tooltip="Next"
                onClick={next}
              >
                <i className="material-icons">arrow_forward</i>
              </a>
            </div>
          </div>
        </div>
        <div
          className="carousel-item"
          href="#one!"
          style={{ overflow: "scroll" }}
        >
          <div className="row">
            <div className="col s6">
              <h5 className="center-align">Usuarios Registrados</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Mail</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC1.tab1.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.mail}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col s6">
              <h5 className="center-align">Usuarios Activos</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Mail</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC1.tab2.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.mail}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col s6">
              <h5 className="center-align">Usuarios Nuevos</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Mail</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC1.tab3.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.mail}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col s6">
              <h5 className="center-align">Usuarios Frecuentes</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC1.tab4.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.mail}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="carousel-item"
          href="#two!"
          style={{ overflow: "scroll" }}
        >
          <div className="row">
            <div className="col s6">
              <h5 className="center-align">Repartidores y Pedidos</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Pedidos</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC2.tab1.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.dato}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col s6">
              <h5 className="center-align">Rating Repartidores</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC2.tab2.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.dato}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h5 className="center-align">Ganancias En Repartidores</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Quetzales</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC2.tab3.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.dato}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="carousel-item"
          href="#three!"
          style={{ overflow: "scroll" }}
        >
          <div className="row">
            <div className="col s6">
              <h5 className="center-align">Restaurantes Con Mas Pedidos</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC3.tab1.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.dato}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col s6">
              <h5 className="center-align">Restaurantes Con Ganancias</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Quetzales</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC3.tab2.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.dato}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h5 className="center-align">Productos Mas Vendidos</h5>
              <table className="centered highlight hoverable">
                <thead className="indigo darken-4 white-text">
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {dataC3.tab3.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.dato}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}