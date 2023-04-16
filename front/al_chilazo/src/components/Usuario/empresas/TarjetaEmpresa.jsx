import '../../../styles/TarjetaEmpresa.css'
import { Link } from "react-router-dom";
function TarjetasEmpresa(props) {
  const { empresa } = props;
  const { metodo } = props;
  return (
    <div className="thorizontalm">
      <div className="card-image">
        <Link to={{ pathname: "/productos", state: { empresa: empresa.id } }} onClick={() => metodo(empresa.id)}>
          {console.log("EMPRESAID: ",empresa.id)}
          <img src={empresa.imagen} />
        </Link>
      </div>
      <div className="card-stacked">
        <div className='titulo'>
          <p>{empresa.name}</p>
        </div>
        <div className="card-content">
          <p>Departamento de {empresa.depto}</p>
        </div>
        <div className="card-content">
          <p>Municipio de {empresa.municipio}</p>
        </div>
        {/*<div className="card-content">
          <p>Zona {empresa.zona}</p>
  </div>*/}
        <div className="card-content">
          <p>{empresa.mail}</p>
        </div>
      </div>
    </div>
  );
}

export default TarjetasEmpresa;

