import '../styles/TarjetaEmpresa.css'
function TarjetasEmpresa(props) {
  const { empresa } = props;
  return (
        <div className="thorizontal">
          <div className="card-image">
            <a href="#">
            <img src={empresa.imagen} />
            </a>
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
            <div className="card-content">
              <p>Zona {empresa.zona}</p>
            </div>
            <div className="card-content">
              <p>{empresa.email}</p>
            </div>
            <div className="card-action">
              <a href="#">Ver productos</a>
            </div>
          </div>
        </div>
  );
}

export default TarjetasEmpresa;

