import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { auth } from "../../shared/auth";
import { departamentos, municipios } from "../../shared/ubicacion";
import axios from "axios";
import "../../styles/Repartidor/perfil_rep.css";

export function PerfilRepartidor() {
  const [dept, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [depState, setDepState] = useState(departamentos);
  const [munState, setMunState] = useState([]);
  const [name, setName]=useState("");
  const [lastname, setLast]=useState("");
  const [mail, setMail]=useState("");
  const [phone, setPhone]=useState("");
  const [depto, setDepto]=useState("");
  const [city, setCity]=useState("");
  const [license, setLicense]=useState("");
  const [own_transport, setOwn_transport]=useState("");
  const [ratingValue, setRatingValue] = useState(0.0)
  const [fillStars, setStarFill] = useState([
    "star_border",
    "star_border",
    "star_border",
    "star_border",
    "star_border"
  ])
  
  useEffect(() => {
    getPerfil()

    var elems = document.getElementById("selDep");
    M.FormSelect.init(elems, {});

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
    
  }, []);

  const getPerfil = async () => {
    const data = {
      id: JSON.parse(localStorage.getItem("user")).id
    }

    try {
      console.log(data)
      const result = (await axios.post(url + "perfil-repartidor", data, auth)).data
      console.log("RESULT", result.res)

      if (result.res) { //de que me sirve tener 2 si una no funciona bien xddd
        setName(result.res.name)
        setLast(result.res.lastname)
        setMail(result.res.mail)
        setPhone(result.res.phone)
        setDepto(result.res.depto)
        setCity(result.res.city)
        

        if(result.res.license === 0) {
          setLicense("NO TIENE LICENCIA")
        } else if(result.res.license === 1) {
          setLicense("LICENCIA TIPO A")
        } else if(result.res.license === 2) {
          setLicense("LICENCIA TIPO B")
        } else if(result.res.license === 3) {
          setLicense("LICENSIA TIPO C")
        } else if(result.res.license === 4) {
          setLicense("LICENCIA TIPO M")
        } else if(result.res.license === 5) {
          setLicense("LICENCIA TIPO E")
        }

        if(result.res.own_transport === "0") {
          setOwn_transport("NO TIENE TRANSPORTE PROPIO")
        } else if(result.res.own_transport === "1") {
          setOwn_transport("SI TIENE TRANSPORTE PROPIO")
        }

        // ? PENDIENTE RECIBIR RATING
        
          setRatingValue(result.res.rating)
          if(result.res.rating) {
          let valueStars = parseInt(result.res.rating) / 1
          let newStarsValues = []

          for(let i = 0; i < valueStars; i++) {
            newStarsValues.push("star")
          }

          if(result.res.rating % 1 !== 0) {
            newStarsValues.push("star_half")
          }

          for(let i = valueStars; i < 5; i++) {
            newStarsValues.push("star_border")
          }

          setStarFill(newStarsValues)
        }

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4"
        })
      } else {
          M.toast({
              html: result.message,
              classes: "white-text rounded red darken-4",
          });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4"
      })
    }
  }

  useEffect(() => {
    getMunAux();
  }, [dept]);

  useEffect(() => {
    var elem = document.getElementById("selMun");
    M.FormSelect.init(elem, {});
  }, [munState]);

  const getMunAux = async () => {
    const result = await municipios[dept];
    console.log(result);
    setMunState(result);
  };

  const changeZoneSol = async () => {
    var elem = document.getElementById("changeUbication");
    var instance = M.Modal.getInstance(elem);

    try {
      if (dept === "") {
        M.toast({
          html: "No Se Ha Seleccionado Un Departamento",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      if (municipio === "") {
        M.toast({
          html: "No Se Ha Seleccionado Un Municipio",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      const data = {
        id: JSON.parse(localStorage.getItem("user")).id,
        depto: dept,
        city: municipio,
      };

      console.log(data);
      const result = (await axios.post(url + "soli-change-zone", data, auth)).data;
      console.log(result);

      if (result.res) {
        instance.close();

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

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="green-text text-darken-2 center-align">
                MI PERFIL
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <br />
          <div className="row center-content borderRating">
            <div className="col s4 center-align yellow-text text-darken-3">
              <i className="material-icons iconSize">{fillStars[0]}</i>
              <i className="material-icons iconSize">{fillStars[1]}</i>
              <i className="material-icons iconSize">{fillStars[2]}</i>
              <i className="material-icons iconSize">{fillStars[3]}</i>
              <i className="material-icons iconSize">{fillStars[4]}</i>
            </div>
            <div className="col s1 center-content">
              <i className="material-icons medium yellow-text text-darken-3">trending_up</i>
            </div>
            <div className="col s5 center-align">
              <h4>Rating:&nbsp;{ratingValue}/5</h4>
            </div>
          </div> 
          <br />
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">person</i>
                  <input
                    type="text"
                    id="nombrePerfilRep"
                    disabled={true}
                    className="validate active black-text"
                    value={name}
                  />
                  <label htmlFor="nombrePerfilRep" className="active">NOMBRE</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">person</i>
                  <input
                    type="text"
                    id="apellidoPerfilRep"
                    disabled={true}
                    className="validate black-text"
                    value={lastname}
                  />
                  <label className="active" htmlFor="apellidoPerfilRep">APELLIDO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">markunread</i>
                  <input
                    type="email"
                    id="emailPerfilRep"
                    disabled={true}
                    className="validate black-text"
                    value={mail}
                  />
                  <label className="active"  htmlFor="emailPerfilRep">CORREO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">smartphone</i>
                  <input
                    type="tel"
                    id="telefonoPerfilRep"
                    disabled={true}
                    className="validate black-text"
                    value={phone}
                  />
                  <label className="active"  htmlFor="telefonoPerfilRep">NO. CELULAR</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">map</i>
                  <input
                    type="text"
                    id="depPerfilRep"
                    disabled={true}
                    className="validate black-text"
                    value={depto}
                  />
                  <label className="active"  htmlFor="depPerfilRep">DEPARTAMENTO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">place</i>
                  <input
                    type="text"
                    id="munPerfilRep"
                    disabled={true}
                    className="validate black-text"
                    value={city}
                  />
                  <label className="active"  htmlFor="munPerfilRep">MUNICIPIO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">badge</i>
                  <input
                    type="text"
                    id="licensePerfilRep"
                    className="validate black-text"
                    disabled={true}
                    value={license}
                  />
                  <label className="active" htmlFor="licensePerfilRep">TIPO LICENCIA</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">badge</i>
                  <input
                    type="text"
                    id="ownTransRep"
                    className="validate black-text"
                    disabled={true}
                    value={own_transport}
                  />
                  <label className="active"  htmlFor="ownTransRep">TRANSPORTE PROPIO</label>
                </div>
              </div>
              <div className="row">
                <div className="col s8 offset-s4">
                  <a
                    className="btn green darken-3 white-text modal-trigger"
                    href="#changeUbication"
                  >
                    <i className="material-icons left">change_circle</i>
                    SOLICITAR CAMBIO DE UBICACION
                  </a>
                </div>
              </div>
            </form>
          </div>
          <br />
          <br />
        </div>
      </section>
      <div id="changeUbication" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="container">
            <div className="row">
              <div className="col s12 center-align">
                <h5 className="red-text text-darken-3">
                  SOLICITUD PARA CAMBIAR UBICACION
                </h5>
                <div className="divider"></div>
              </div>
            </div>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">home_work</i>
                    <select
                      className="validate"
                      id="selDep"
                      onChange={(e) => setDepartamento(e.target.value)}
                      defaultValue={""}
                    >
                      <option value={""} disabled>
                        SELECCIONE EL NUEVO DEPARTAMENTO
                      </option>
                      {depState.map((dep, index) => {
                        return (
                          <option value={dep} key={index}>
                            {dep}
                          </option>
                        );
                      })}
                    </select>
                    <label>DEPARTAMENTO</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">add_home_work</i>
                    <select
                      className="validate"
                      id="selMun"
                      onChange={(e) => setMunicipio(e.target.value)}
                      defaultChecked={""}
                    >
                      <option value={""} disabled>
                        SELECCIONE EL NUEVO MUNICIPIO
                      </option>
                      {munState.map((muni, index) => {
                        return (
                          <option value={muni} key={index}>
                            {muni}
                          </option>
                        );
                      })}
                    </select>
                    <label>MUNICIPIO</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="waves-effect waves-green btn-flat"
            onClick={changeZoneSol}
          >
            ENVIAR
          </a>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat">
            CANCELAR
          </a>
        </div>
      </div>
    </>
  );
}
