import React, { useEffect, useState } from "react";
import M from "materialize-css";
import "../../../styles/FinalizarPedido.css";

function FinalizarPedido(props) {
    const { carrito, totalPedido } = props;
    const [productos, setProductos] = useState(carrito);
    const [total, setTotal] = useState(totalPedido);
    const [direccion, setDireccion] = useState([
        {
            direccion: "",
            indicacion: "",
            telefono: "",
        }
    ]);

    useEffect(() => {
        M.AutoInit();
        console.log(carrito);
    }, []);

    const sumarCantidad = (producto) => {
        const nuevosProductos = productos.map((p) => {
            if (p.id === producto.id) {
                p.cantidad++;
            }
            return p;
        });
        setProductos(nuevosProductos);
        setTotal(total + parseFloat(producto.precio));
    };

    const restarCantidad = (producto) => {
        const nuevosProductos = productos.map((p) => {
            if (p.id === producto.id) {
                p.cantidad--;
            }
            return p;
        });
        setProductos(nuevosProductos.filter((p) => p.cantidad > 0));
        setTotal(total - parseFloat(producto.precio));
    };

    const eliminarDelCarrito = (producto) => {
        const productosDelMismoTipo = carrito.filter((p) => p.id === producto.id);
        const cantidadTotal = productosDelMismoTipo.reduce((total, p) => total + p.cantidad, 0);
        setTotal(total - producto.precio * cantidadTotal);
        setProductos(productos.filter((p) => p.id !== producto.id));
    };


    const handleChange = (e) => {
        setDireccion({
            ...direccion,
            [e.target.name]: e.target.value
        })


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(direccion);
    }

    const confirmarPedido = () => {
        console.log("direccion: ", direccion);
        if (direccion.direccion === "" || direccion.telefono === "") {
            M.toast({ html: 'Ingresa una direccion de envío', classes: 'rounded', displayLength: 1000, inDuration: 1000, outDuration: 1000 });
        } else {
            if (direccion.telefono.length < 8 || direccion.telefono.length > 8) {
                M.toast({ html: 'Ingresa un número de teléfono válido', classes: 'rounded', displayLength: 1000, inDuration: 1000, outDuration: 1000 });
            }
            else if (isNaN(direccion.telefono)) {
                M.toast({ html: 'Ingresa un número de teléfono válido', classes: 'rounded', displayLength: 1000, inDuration: 1000, outDuration: 1000 })
            }
            else {

                console.log("direccion: ", direccion);
                console.log("confirmar pedido");
                console.log("carrito: ", carrito);
                console.log("totalPedido: ", totalPedido);
            }
        }
    };

    return (
        <div className="finalizarp">
            <div className="titulos">
                <h3>Confirmación de Pedido</h3>
            </div>
            <div className="productos-container">
                {productos.map((producto) => (
                    <div key={producto.id} className="producto">
                        <div className="nombre-precio">
                            <span className="nombre">{producto.name}</span>
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
            <div className="direccion-container">
                <div className="containers">
                    <form onSubmit={handleSubmit}>
                        <div className="input-field col s12">
                            <input id="direccion" name="direccion" type="text" className="validate" onChange={handleChange} />
                            <label htmlFor="direccion">Dirección / Punto de Referencia</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="indicacion" name="indicacion" type="text" className="validate" onChange={handleChange} />
                            <label htmlFor="indicacion">Indicaciones para la entrega</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">phone</i>
                            <input id="icon_telephone" type="tel" className="validate" name="telefono" pattern="[0-9]*" inputMode="numeric" onChange={handleChange} />
                            <label htmlFor="icon_telephone">Teléfono</label>
                        </div>
                    </form>
                </div>
            </div>
            {productos.length > 0 && (
                <div className="total-pedido">
                    <p>Total del pedido: {`Q. ${total}`}</p>
                    <button
                        className="btn-continuar"
                        onClick={() => confirmarPedido()}
                    >
                        Confirmar Pedido
                    </button>
                </div>
            )}
        </div>
    );


}

export default FinalizarPedido;
