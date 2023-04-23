import TarjetasProductos from "./TarjetasProductos";
import { useEffect, useState } from "react";
import "../../../styles/Productos.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../../shared/url";

function Productos(props) {
  const { functionconfirmar } = props;
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [carrito, setCarrito] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [productos,setProductos] = useState([]);
  const data = {
    id: localStorage.getItem("idempresauser")
  }
  let usr = localStorage.getItem("user")
  const user = {
    id_usr: usr.id
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
    setCarrito(JSON.parse(localStorage.getItem("carrito")) || []);
    setTotalPedido(JSON.parse(localStorage.getItem("totalPedido")) || 0);
  }, []);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    guardarCarritoEnLocalStorage();
  }, [carrito]);


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
  
    // Verificar si el producto ya está en el carrito
    if (productoExistente) {
      // Aumentar la cantidad del producto existente en el carrito
      if (productoExistente.disponibilidad > productoExistente.cantidad) {
        productoExistente.cantidad++;
        setCarrito([...carrito]);
        setTotalPedido(totalPedido + parseFloat(producto.precio));
        producto.disponibilidad -= 1;
        guardarCarritoEnLocalStorage();
      } else {
        M.toast({ html: "No hay más unidades disponibles" });
      }
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      console.log("producto en else: ", producto);
      if (producto.disponibilidad === 0) {
        M.toast({ html: "No hay más unidades disponibles" });
        return;
      }
      if (carrito.length === 0) {
        console.log("carrito vacio");
        setCarrito([{ ...producto, cantidad: 1 }]);
      } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      }
      console.log("carrito: ", carrito);
      producto.disponibilidad -= 1;
      setTotalPedido(totalPedido + parseFloat(producto.precio));
      guardarCarritoEnLocalStorage();
    }
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
    producto.disponibilidad += cantidadTotal;
    guardarCarritoEnLocalStorage();
  };
  
  
  
  const sumarCantidad = (producto) => {
    //disponibilidad
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((p) => p.id === producto.id);
    console.log("producto existente: ", productoExistente);
    console.log("producto: ", producto);
    if (productoExistente.disponibilidad <= productoExistente.cantidad || productoExistente.disponibilidad <= 0) {
      M.toast({ html: "No hay más unidades disponibles" });
      return;
    }
    productoExistente.cantidad++;
    setCarrito(nuevoCarrito);
    setTotalPedido(totalPedido + parseFloat(producto.precio));
    productoExistente.disponibilidad -= 1;
    //getCarrito();
    guardarCarritoEnLocalStorage();
  };
  
  
  
  const restarCantidad = (producto) => {
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((p) => p.id === producto.id);
    if (productoExistente.cantidad === 1) {
      eliminarDelCarrito(producto);
    } else {
      productoExistente.cantidad--;
      productoExistente.disponibilidad += 1;
      setCarrito(nuevoCarrito);
    }
  
    setTotalPedido(totalPedido - producto.precio);
    guardarCarritoEnLocalStorage();
    console.log("producto luego de restar: ", producto);
  };
  

  const confirmar = (carro, totalPedido) => {
    console.log("carro: ", carro);
    functionconfirmar(carro, totalPedido)
  }

  const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalPedido", JSON.stringify(totalPedido));
  }

  



  return (
    <div className="contenedor-general-productos">
      <div className="contenedor-busqueda">
        <div className="container-input">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <input
                id="icon_prefix"
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <label htmlFor="search">Busqueda</label>
            </div>
            <div className="col s6">
            <ul id="dropdown2" className="dropdown-content">
            <li key="Todas" onClick={() => setCategoria("Todas")}> <a>Todas</a></li>
            {categoriasUnicas.map((producto) => (
              <li key={producto} onClick={() => setCategoria(producto)}> <a>{producto}</a></li>
            ))}
          </ul>
          <a className="btn dropdown-trigger" data-target="dropdown2">{`Categoria: ${categoria}`}<i className="material-icons right">arrow_drop_down</i></a>
            </div>
          </div>
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