import '../../../styles/TarjetasProductos.css'
function TarjetasProductos(props) {
  const { producto, agregarAlCarrito } = props;
  return (
        <div className="thorizontal">
          <div className="card-image" style={{display: "flex", alignItems: "center"}}>
            <a href="#">
            <img src={producto.imagen} className="responsive-img"/>
            </a>
          </div>
          <div className="card-stacked">
            <div className='titulo'>
            <p>{producto.name}</p>
            </div>
            <div className="card-content">
              <p>{`Q. ${producto.precio}`}</p>
            </div>
            <div className="card-action">
            <a class="btn-floating btn-large scale-out red darken-1" onClick={() => agregarAlCarrito(producto)}><i class="material-icons">add_shopping_cart</i></a>
            </div>
          </div>
        </div>
  );
}

export default TarjetasProductos;

