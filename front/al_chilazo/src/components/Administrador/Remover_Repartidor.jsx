import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { auth } from "../../shared/auth";
import axios from "axios";

export function RemoverRepartidor() {
  const [listadoRepartidores, setListadoRepartidores] = useState([]);
  const [repartidorModal, setRepartidor] = useState("");
  const [idRepartidor, setRepartidorID] = useState(0);
  const [justificacionRep, setJustificacion] = useState("")

  useEffect(() => {
    getData();

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
  }, []);

  const getData = async () => {
    try {
      const result = (await axios.get(url + "solicitudes-repartidor", auth))
        .data;
      console.log(result);

      if (result.res) {
        let listaAux = result.res.filter(
          (repartidor) => repartidor.approved === 1
        );
        setListadoRepartidores(listaAux);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const eliminarRepartidor = async () => {
    const data = {
      id: idRepartidor,
      state: 2,
      justificacion: justificacionRep
    };

    try {
      const result = (
        await axios.post(url + "confirmar-repartidor", data, auth)
      ).data;
      console.log(result);

      if (result.res) {
        let aux = listadoRepartidores.filter(
          (repartidor) =>
            repartidor.id !== idRepartidor
        );
        setListadoRepartidores(aux);

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
              <h2 className="deep-purple-text text-darken-2 center-align">
                Remover Repartidores
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collection">
                {listadoRepartidores.map((repartidor) => {
                  return (
                    <li className="collection-item avatar">
                      <i className="material-icons circle indigo darken-2">
                        delivery_dining
                      </i>
                      <span className="title">{repartidor.name}</span>
                      <p>
                        {repartidor.mail} <br />
                        {repartidor.phone}
                      </p>
                      <a
                        href="#conf-delete-rep"
                        className="secondary-content modal-trigger hicon"
                        onClick={() => {
                          setRepartidor(repartidor.name);
                          setRepartidorID(repartidor.id);
                        }}
                      >
                        <i className="material-icons red-text iconSize">
                          cancel
                        </i>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="modal" id="conf-delete-rep">
        <div className="modal-content">
          <h4>Confirmar Eliminacion</h4>
          <div className="divider"></div>
          <h6>Seguro que desea eliminar al Repartidor {repartidorModal}?</h6>
          <h6>Esta opcion no se puede revertir...</h6>
          <div className="container">
            <div className="row">
              <h5>Motivo Por El Cual Desea Dar De Baja Al Repartidor</h5>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="justificacionRep"
                  className="materialize-textarea"
                  onChange={(e) => setJustificacion(e.target.value)}
                ></textarea>
                <label for="justificacionRep">Textarea</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={eliminarRepartidor}
          >
            Agree
          </a>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat">
            Dismiss
          </a>
        </div>
      </div>
    </>
  );
}
