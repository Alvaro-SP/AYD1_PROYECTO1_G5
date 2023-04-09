import TarjetasEmpresa from "./TarjetaEmpresa";
import { useState } from "react";
import '../styles/Empresas.css'
function Empresas(){
    const [busqueda, setBusqueda] = useState("");
    const empresas = [
        {
            id: 1,
            name: "Al macarone",
            description: "Comida Italiana",
            categoria: "Comida Italiana",
            email: "empresa1@gmail.com",
            depto: "Guatemala", 
            zona: "10",
            municipio: "Guatemala",
            imagen: "https://centranorte.com.gt/wp-content/uploads/2015/04/23.jpg",
        },
        {
            id: 2,
            name: "McDonalds",
            description: "Comida Rapida y Hamburguesas",
            categoria: "Comida Rapida",
            email: "asdf@gmail.com",
            depto: "guatemala",
            zona: "10",
            municipio: "Guatemala",
            imagen: "https://brandemia.org/contenido/subidas/2022/10/marca-mcdonalds-logo.png",
        },
        {
            id: 3,
            name: "Pizza Hut",
            description: "Comida Italiana",
            categoria: "Comida Italiana",
            email: "asdf@gmail.com",
            depto: "guatemala",
            zona: "10",
            municipio: "Guatemala",
            imagen: "https://plazaatanasio.com/wp-content/uploads/2020/05/PIZZA-HUT-cuadrado.jpg",
        },
    ]
    const filtrarEmpresas = () => {
        if (busqueda !== "") {
            return empresas.filter((empresa) => {
                return empresa.name.toLowerCase().includes(busqueda.toLowerCase());
            });
        } else {
            return empresas;
        }
    };

    return (
        <div className="contenedor-general-empresas">
            <div className="container-input">
                <div className="input-field">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} />
                    <label for="search">Busqueda</label>
                </div>
            </div>
            <row>
            <div className="contenedor-empresas">
                <div className="tarjetas-empresa">
                    {filtrarEmpresas().map((empresa) => (
                        <TarjetasEmpresa empresa={empresa} />
                    ))}
                </div>
            </div>
            </row>
        </div>
    );

}

export default Empresas;