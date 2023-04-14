import '../../../styles/Tarjetas.css'
//creacion de tarjetas para mostrar los productos por categoria
function Tarjetas(props) {
    const { categoria } = props;
    return (
        <div className="row">
            <div className="col s12 m6 l3">
                <div className="card">
                    <div className="card-image">
                        <a href='#'>
                        <img src={categoria.imagen}/>
                        </a>
                        <a href='#'> <span className="card-title">{categoria.name}</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tarjetas;