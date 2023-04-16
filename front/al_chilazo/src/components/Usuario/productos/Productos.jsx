import TarjetasProductos from "./TarjetasProductos";
import { useEffect, useState } from "react";
import "../../../styles/Productos.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../../shared/url";

function Empresas(props) {
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
  // useEffect(() => {
    axios.post(url + "products-empresa",data)
    .then(res => {
        console.log("se recibe id desde productos: ",res.data.res)
        setProductos(res.data.res);
    }
    );
  // }, []);

  useEffect(() => {
    M.AutoInit();
  }, []);

  //const productos = [
  //  [
  //    {
  //      id: 1,
  //      name: "Lasagna",
  //      precio: "20.00",
  //      categoria: "Comida",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
  //    {
  //      id: 2,
  //      name: "Pizza",
  //      precio: "20.00",
  //      categoria: "Comida",
  //      imagen: "https://cdn.elperiodico.com.gt/wp-content/uploads/2020/08/30222943/330-349.jpg",
  //    },
  //    {
  //      id: 3,
  //      name: "Hamburguesa",
  //      precio: "20.00",
  //      categoria: "Comida",
  //      imagen: "https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg",
  //    },
  //  ],
  //  [
  //    {
  //      id: 1,
  //      name: "Big Mac",
  //      precio: "20.50",
  //      categoria: "Comida",
  //      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/McD_Big_Mac.jpg/1200px-McD_Big_Mac.jpg",
  //    },
  //    {
  //      id: 2,
  //      name: "Caja Feliz",
  //      precio: "20.00",
  //      categoria: "Comida",
  //      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6eKA0KWeHi15EBJYojErnX9KcUdYEj9y5w",
  //    },
  //    {
  //      id: 3,
  //      name: "McFlurry",
  //      precio: "20.00",
  //      categoria: "Helados",
  //      imagen: "https://mcdonalds.com.gt/imagen/menu-products/1673328345_011_PedidosYa_400x400px_McFlurry.png",
  //    },
  //    {
  //      id: 4,
  //      name: "McNifica",
  //      precio: "40.00",
  //      categoria: "Comida",
  //      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-dBRfKeVOnuAfrPz8xVU0D7Tq6XXJaSmKw",
  //    },
  //    {
  //      id: 5,
  //      name: "Coca Cola",
  //      precio: "20.00",
  //      categoria: "Bebidas",
  //      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/480px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
  //    },
  //    {
  //      id: 6,
  //      name: "Fanta",
  //      precio: "20.00",
  //      categoria: "Bebidas",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
  //    {
  //      id: 7,
  //      name: "Cafe con leche",
  //      precio: "20.00",
  //      categoria: "Cafes",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
  //    {
  //      id: 8,
  //      name: "Cafe solo",
  //      precio: "20.00",
  //      categoria: "Cafes",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
  //    {
  //      id: 9,
  //      name: "Gatorade",
  //      precio: "20.00",
  //      categoria: "Bebidas",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
  //    {
  //      id: 10,
  //      name: "Agua",
  //      precio: "5.00",
  //      categoria: "Bebidas",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
  //    {
  //      id: 11,
  //      name: "Cafe con leche",
  //      precio: "20.00",
  //      categoria: "Cafes",
  //      imagen: "https://www.sipandfeast.com/wp-content/uploads/2020/11/lasagna-meat-sauce-recipe-3.jpg",
  //    },
//
  //  ],
//
  //]
  const categoriasUnicas = [...new Set(productos[empresa].map(producto => producto.categoria))];
  const filtrarProductos = () => {
    let productosFiltradosPorCategoria;

    if (categoria !== "Todas") {
      productosFiltradosPorCategoria = productos[empresa].filter((producto) => {
        return producto.category === categoria;
      });
    } else {
      productosFiltradosPorCategoria = productos[empresa];
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
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((p) => p.id === producto.id);
    productoExistente.cantidad++;
    setCarrito(nuevoCarrito);
    setTotalPedido(totalPedido + parseFloat(producto.precio));
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
        <div className="row">
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

export default Empresas;