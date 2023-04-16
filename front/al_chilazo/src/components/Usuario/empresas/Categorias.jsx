import Tarjetas from "./Tarjetas";
import '../../../styles/Categorias.css'
import { useState, useEffect } from "react";

function Categorias() {
    //const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    //useEffect(() => {
    //    fetch("http://localhost:3001/categorias")
    //        .then((response) => response.json())
    //        .then((data) => setCategorias(data));
    //}, []);

    const categorias = [
        {
            id: 1,
            name: "Comida Mexicana",
            imagen: "https://www.paulinacocina.net/wp-content/uploads/2020/01/untitled-copy-800x450.jpg",
        },
        {
            id: 2,
            name: "Comida Italiana",
            imagen: "https://previews.123rf.com/images/foontntd/foontntd1703/foontntd170300056/73686692-comida-italiana-dibujo-dise%C3%B1o-gr%C3%A1fico.jpg",
        },
        {
            id: 3,
            name: "Comida China",
            imagen: "https://images.ecestaticos.com/o7XH9mvea92c8GIbNkh8yfnAYRY=/1x157:2120x1257/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F771%2Fb51%2F2f5%2F771b512f5560b123a01c9b6f348a461d.jpg",
        },
        {
            id: 4,
            name: "Arepas",
            imagen: "https://assets.epicurious.com/photos/63d4367c9cd8e164fe127523/1:1/w_1920,c_limit/Arepas_RECIPE_120722_43695-v2.jpg",
        },
        {
            id: 5,
            name: "Bebidas",
            imagen: "https://thefoodtech.com/wp-content/uploads/2020/05/bebidas-no-alcoh%C3%B3licas.jpg",
        },
        {
            id: 6,
            name: "Cafetería",
            imagen: "https://www.iniciarunacafeteria.com/wp-content/uploads/2013/07/como-iniciar-una-cafeteria-propia.jpg",
        },
        {
            id: 7,
            name: "Carnes",
            imagen: "https://s2.abcstatics.com/media/bienestar/2021/09/27/tipos-de-carne-1-kWj--620x349@abc.jpg",
        },
        {
            id: 8,
            name: "Ensaladas",
            imagen: "https://s1.eestatic.com/2016/10/11/cocinillas/cocinillas_162247460_116258364_1706x960.jpg"
        },
        {
            id: 9,
            name: "Comida Rapida",
            imagen: "https://estaticos-cdn.prensaiberica.es/clip/9f24c208-6cfb-472d-8a40-5d2c52a7b9e5_16-9-discover-aspect-ratio_default_0.jpg",
        },

    ];
    const filtrarCategorias = () => {
        if (busqueda !== "") {
            return categorias.filter((categoria) => {
                return categoria.name.toLowerCase().includes(busqueda.toLowerCase())
            })
        }
        return categorias;

    }
    return (
        <div className="contenedor-general">
            <div className="container-input">
                <div className="input-field">
                    <i class="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} />
                    <label for="search">Busqueda</label>
                </div>
            </div>
            <div className="usuario-categorias">
                <div className="tarjetas">
                    {filtrarCategorias().map((categoria) => (
                        <Tarjetas categoria={categoria} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categorias;
