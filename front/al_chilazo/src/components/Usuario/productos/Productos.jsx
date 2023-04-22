import TarjetasProductos from "./TarjetasProductos";
import { useEffect, useState } from "react";
import "../../../styles/Productos.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../../shared/url";

function Productos(props) {
  const { empresa } = props;
  const { functionconfirmar } = props;
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [carrito, setCarrito] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [productos,setProductos] = useState([]);
  const data = {
    id: empresa,
  }
  const user = {
    id_usr: 1
  }
  useEffect(() => {
    const fetchDta = async () => {
      const response = await axios.post(url + "products-empresa",data);
      setProductos(response.data.res);
      console.log("se recibe id desde productos: ",response.data.res)
    };

    fetchDta();
    //const getCarrito = async() => {
    //  const response = await axios.post(url + "get-cart",user) 
    //  console.log("se recibe carritop: ",response.data.cart  )
    //  setCarrito(response.data.cart);
    //}
    //getCarrito();
  }, []);

  useEffect(() => {
    M.AutoInit();
  }, []);

  


  const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))];
  const filtrarProductos = () => {
    let productosFiltradosPorCategoria;

    if (categoria !== "Todas") {
      productosFiltradosPorCategoria = productos.filter((producto) => {
        return producto.categoria === categoria;
      });
    } else {
      productosFiltradosPorCategoria = productos;
    }

    if (busqueda !== "") {
      return productosFiltradosPorCategoria.filter((producto) => {
        return producto.name.toLowerCase().includes(busqueda.toLowerCase());
      });
    } else {
      return productosFiltradosPorCategoria;
    }
  };

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumentamos su cantidad
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id ? { ...productoExistente, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setTotalPedido(totalPedido + parseFloat(producto.precio));
  };


  const eliminarDelCarrito = (producto) => {
    // buscar todos los productos del mismo tipo
    const productosDelMismoTipo = carrito.filter((p) => p.id === producto.id);
    console.log("productos del mismo tipo: ", productosDelMismoTipo);
    // calcular la cantidad total de estos productos
    const cantidadTotal = productosDelMismoTipo.reduce((total, p) => total + p.cantidad, 0);

    // restar la cantidad total del totalPedido
    setTotalPedido(totalPedido - producto.precio * cantidadTotal);

    // eliminar los productos del carrito
    setCarrito(carrito.filter((p) => p.id !== producto.id));
  };

  const sumarCantidad = (producto) => {
    //disponibilidad
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((p) => p.id === producto.id);
    productoExistente.cantidad++;
    setCarrito(nuevoCarrito);
    setTotalPedido(totalPedido + parseFloat(producto.precio));
    //getCarrito();
  };

  const restarCantidad = (producto) => {
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((p) => p.id === producto.id);
    if (productoExistente.cantidad === 1) {
      eliminarDelCarrito(producto);
    } else {
      productoExistente.cantidad--;
      setCarrito(nuevoCarrito);
    }

    setTotalPedido(totalPedido - producto.precio);
  };

  const confirmar = (carro, totalPedido) => {
    console.log("carro: ", carro);
    functionconfirmar(carro, totalPedido)
  }




  return (
    <div className="contenedor-general-productos">
      <div className="contenedor-busqueda">
        <div className="container-input">
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <input
              id="icon_prefix"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <label htmlFor="search">Busqueda</label>
          </div>
          <ul id="dropdown2" className="dropdown-content">
            <li key="Todas" onClick={() => setCategoria("Todas")}> <a>Todas</a></li>
            {categoriasUnicas.map((producto) => (
              <li key={producto} onClick={() => setCategoria(producto)}> <a>{producto}</a></li>
            ))}
          </ul>
          <a className="btn dropdown-trigger" data-target="dropdown2">{`Categoria: ${categoria}`}<i className="material-icons right">arrow_drop_down</i></a>
        </div>
      </div>
      <div className="contenedor-productos">
        <div className="tarjetas-producto">
          {filtrarProductos().map((producto) => (
            <TarjetasProductos
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </div>
      <div className="pedidos">
        <div className="rowl">
          <h4>Mi pedido: {`Q. ${totalPedido}`}</h4>
          <div className="productos-containerp">
            {carrito.map((producto) => (
              <div key={producto.id} className="productop">
              <div className="nombre-precio">
                  <span className="nombre">{producto.name} </span>
                  <span className="precio">Q. {producto.precio}</span>
              </div>
              <div className="botones">
                  <button className="boton-sumar" onClick={() => sumarCantidad(producto)}>+</button>
                  <span className="cantidad">{producto.cantidad}</span>
                  <button className="boton-restar" onClick={() => restarCantidad(producto)}>-</button>
                  <button className="boton-eliminar" onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
              </div>
          </div>
            ))}
            </div>
            </div>
            {carrito.length > 0 && (
              <div>
                <Link to="/finalizarpedido" onClick={() => confirmar(carrito, totalPedido)} className="btn-continuar">
                  Continuar
                </Link>
                
              </div>
            )}
          
        
      </div>
    </div>

  );

}

export default Productos;