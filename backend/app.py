import mysql.connector
from flask import Flask, jsonify
from flask import  make_response
from flask.globals import request
from flask_cors import CORS
from src.Login import login
from src.Registro import registro
from src.usuarios.GetCategories import getCategories
from src.usuarios.Empresas_category import empresaCategoria
from src.usuarios.Products_empresa import productsEmpresa
from src.usuarios.GetCart import get_cart
from src.usuarios.AddToCart import add_to_cart
from src.usuarios.DeleteFromCart import delete_from_cart
from src.usuarios.HistorialPedidos import historialpedidosUSUARIO
from src.usuarios.RealizarPedido import realizarpedidousuario
from src.repartidores.CambioZona import cambiozona, solicambiozona
from src.repartidores.ComisionesGeneradas import comisionesgeneradas
from src.repartidores.HistorialPedidosComp import historialpedidosNAMEUSER
from src.repartidores.PerfilRepartidor import perfilrepartidor
from src.repartidores.SolicitudEntrega import historialpedidos,selectpedido,entregarpedido, pedidosporentregarepartidor
from src.empresas.CategoriasProductoEmpresa import getcategoriaproducto,addcategoriaproducto
from src.empresas.ProductosEmpresa import addproduct,updateproduct,deleteproduct
from src.empresas.PedidosUsuarios import pedidosdeusersempresa,prepararpedido,confirmarpedido
from src.administrador.SolicitudesRepartidores import solicitudRepartidor, cambiarEstadoRepartidor
from src.administrador.SolicitudesEmpresa import cambiarEstadoEmpresa, solicitudEmpresa
from src.administrador.RemoverUsuario import removerUsuario, getUsuarios
from src.administrador.CambiarUbicacion import solicitudUbicacionRep, confirmarUbicaionNueva
from src.administrador.Reportes import aprobadosCONT
import datetime
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                            unset_jwt_cookies, jwt_required, JWTManager

#* Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True
app.config["JWT_SECRET_KEY"] = "ojala-me-muera"
jwt = JWTManager(app)

#! ------------------- CONNECT WITH DATABASE:-------------------
conn  = mysql.connector.connect(
    user='root',
    password='alvaro',
    host='34.28.45.29',
    database='dbproyectoayd',
    port='3306'
)
#* Crea el cursor para ejecutar las consultas
mycursor = conn.cursor()

#! ------------------------- ENDPOINTS -------------------------

#*  ************************ LOGIN ************************
@app.route('/login', methods=['POST'])
def loginzzzz():
    global conn, jwt
    response = login(conn, request, jwt)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"res": True, "message": "Session Finalizada"})
    unset_jwt_cookies(response)
    return response

#*  ********************** REGISTRO ************************
@app.route('/register', methods=['POST'])
def registerzzz():
    global conn
    response = registro(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



#*  ************************  USUARIOS ************************
@app.route('/getcategories', methods=['GET'])
# @jwt_required()
def get_Categories():
    global conn
    response = getCategories(conn)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/empresas-category', methods=['GET'])
# @jwt_required()
def empresacategory():
    global conn
    response = empresaCategoria(conn)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/products-empresa', methods=['POST'])
# @jwt_required()
def empresacategorias():
    global conn
    response = productsEmpresa(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#? SHOPPING CART ==============================================
@app.route('/get-cart', methods=['POST'])
# @jwt_required()
def obtener_carrito():
    global conn
    res_prev = get_cart(conn, request)
    res = jsonify(res_prev)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/add-to-cart', methods=['POST'])
# @jwt_required()
def agregar_al_carrito():
    global conn
    res_prev = add_to_cart(conn, request)
    res = jsonify(res_prev)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/delete-from-cart', methods=['POST'])
# @jwt_required()
def eliminar_del_carrito():
    global conn
    res_prev = delete_from_cart(conn, request)
    res = jsonify(res_prev)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/historial-pedidos-user', methods=['POST'])
# @jwt_required()
def historialpedidosuserrrrr():
    global conn
    res_prev = historialpedidosUSUARIO(conn, request)
    # res = jsonify(res_prev)
    res_prev.headers.add('Access-Control-Allow-Origin', '*')
    return res_prev

@app.route('/realizar-pedido-user', methods=['POST'])
# @jwt_required()
def hacerunpedido():
    global conn
    res_prev = realizarpedidousuario(conn, request)
    #res = jsonify(res_prev)
    res_prev.headers.add('Access-Control-Allow-Origin', '*')
    return res_prev

#*  ***********************  REPARTIDORES *********************
@app.route('/soli-change-zone', methods=['POST'])
# @jwt_required()
def soliczone():
    global conn
    response = solicambiozona(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/comisiones-repartidor', methods=['POST'])
# @jwt_required()
def comisionreparti():
    global conn
    response = comisionesgeneradas(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/historialpedidos-repartidor', methods=['POST'])
# @jwt_required()
def historialpedrep():
    global conn
    response = historialpedidosNAMEUSER(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/pedidosaentregar-repartidor', methods=['POST'])
# @jwt_required()
def pedidosporentregarepartidor_rep():
    global conn
    response = pedidosporentregarepartidor(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/perfil-repartidor', methods=['POST'])
# @jwt_required()
def perfilrepart():
    global conn
    response = perfilrepartidor(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/selectpedido-repartidor', methods=['POST'])
# @jwt_required()
def selpedido():
    global conn
    response = selectpedido(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/entregarpedido-repartidor', methods=['POST'])
# @jwt_required()
def entregarpedrep():
    global conn
    response = entregarpedido(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/change-zone', methods=['POST'])
# @jwt_required()
def czone():
    global conn
    response = cambiozona(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


#*  ************************  EMPRESAS   **********************
@app.route('/categoriasproducto-empresa', methods=['POST'])
# @jwt_required()
def catprodempresa():
    global conn
    response = getcategoriaproducto(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/addcategoriaproducto', methods=['POST'])
# @jwt_required()
def addcategoriaproductoempresa():
    global conn
    response = addcategoriaproducto(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# @app.route('/updatecategoriaproducto', methods=['POST'])
# @jwt_required()
# def updacateprodempre():
#     global conn
#     response = updatecategoriaproducto(conn, request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/deletecategoriaproducto', methods=['POST'])
# @jwt_required()
# def delcatprodempres():
#     global conn
#     response = deletecategoriaproducto(conn, request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

@app.route('/addproduct', methods=['POST'])
# @jwt_required()
def addproductempresa():
    global conn
    response = addproduct(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/updateproduct', methods=['POST'])
# @jwt_required()
def updateproductempresa():
    global conn
    response = updateproduct(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteproduct', methods=['POST'])
# @jwt_required()
def deleteproductemrpess():
    global conn
    response = deleteproduct(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# PEDIDOS DE MODULO EMPRESA
@app.route('/pedidos-de-user-empresa', methods=['POST'])
# @jwt_required()
def pedidosdeusersempresasendpoin():
    global conn
    response = pedidosdeusersempresa(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/preparar-pedido-empresa', methods=['POST'])
# @jwt_required()
def prepararpedidoasdf():
    global conn
    response = prepararpedido(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/confirmar-pedido-empresa', methods=['POST'])
# @jwt_required()
def confirmarpedidosendpoin():
    global conn
    response = confirmarpedido(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
#*  *********************** ADMINISTRADOR *********************
@app.route('/get-notify', methods=['GET'])
# jwt_required()
def get_notifies():
    global conn
    response = aprobadosCONT(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/solicitudes-repartidor', methods=['GET'])
# @jwt_required()
def solicitudes_repartidor():
    global conn
    response = solicitudRepartidor(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/confirmar-repartidor", methods=['POST'])
# @jwt_required()
def confirmar_repartidor():
    global conn
    response = cambiarEstadoRepartidor(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/solicitudes-empresa', methods=['GET'])
# @jwt_required()
def solicitudes_empresa():
    global conn
    response = solicitudEmpresa(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/confirmar-empresa", methods=['POST'])
# @jwt_required()
def confirmar_empresa():
    global conn
    response = cambiarEstadoEmpresa(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/get-usuarios-admin", methods=['GET'])
# @jwt_required()
def obtener_usuarios():
    global conn
    response = getUsuarios(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/remover-usuario", methods=['POST'])
# @jwt_required()
def remover_usuario():
    global conn
    response = removerUsuario(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/solicitudes-ubicacion-rep", methods=['GET'])
# @jwt_required()
def solicitudes_ubicacion():
    global conn
    response = solicitudUbicacionRep(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/confirmar-ub-nueva-rep", methods=['POST'])
# @jwt_required()
def confirmar_nueva_ubicacion():
    global conn
    response = confirmarUbicaionNueva(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(threaded=True,debug=True)
