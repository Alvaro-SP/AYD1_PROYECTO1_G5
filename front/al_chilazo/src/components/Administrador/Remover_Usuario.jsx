import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";
import "../../styles/Administrador/remover_usuario.css";

export function RemoverUsuario() {
  const [listaUsers, setListadoUsers] = useState([]);
  const [userModal, setUserModal] = useState("");
  const [userID, setUserID] = useState(0)

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
      const result = (await axios.get(url + "get-usuarios-admin")).data;
      console.log(result);

      if (result.res) {
        setListadoUsers(result.res);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4"
        })
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const eliminarUsuario = async () => {
    const data = {
      user: userID
    };

    try {
      const result = (await axios.post(url + "remover-usuario", data)).data;
      console.log(result);

      if (result.res) {
        let aux = listaUsers.filter((user) => user.id !== userID);
        setListadoUsers(aux);

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
              <h2 className="red-text text-darken-3 center-align">
                Remover Usuarios
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collection">
                {listaUsers.map((user) => {
                  return (
                    <li className="collection-item avatar">
                      <i className="material-icons circle green darken-1">
                        person
                      </i>
                      <span className="title">{user.name}</span>
                      <p>
                        {"Nombre: " + user.name} <br />
                        {"Correo: " + user.mail}
                      </p>
                      <a
                        href="#conf-delete"
                        className="secondary-content modal-trigger hicon"
                        onClick={() => {
                            setUserModal(user.name)
                            setUserID(user.id)
                          }
                        }
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
      <div id="conf-delete" className="modal">
        <div className="modal-content">
          <h4>Confirmar Eliminacion</h4>
          <div className="divider"></div>
          <h6>Seguro que desea eliminar al usuario {userModal}?</h6>
          <h6>Esta opcion no se puede revertir...</h6>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={eliminarUsuario}
          >
            ACEPTAR
          </a>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat">
            CANCELAR
          </a>
        </div>
      </div>
    </>
  );
}
