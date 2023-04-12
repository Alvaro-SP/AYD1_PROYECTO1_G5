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
from src.repartidores.CambioZona import cambiozona
from src.repartidores.ComisionesGeneradas import comisionesgeneradas
from src.repartidores.HistorialPedidosComp import historialpedidos
from src.repartidores.PerfilRepartidor import perfilrepartidor
from src.repartidores.SolicitudEntrega import historialpedidos,selectpedido,entregarpedido
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
    response = jsonify({"res": "logout successful"})
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
@jwt_required()
def get_Categories():
    global conn
    response = getCategories(conn)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/empresas-category', methods=['POST'])
@jwt_required()
def empresacategory():
    global conn
    response = empresaCategoria(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/products-empresa', methods=['POST'])
@jwt_required()
def empresacategorias():
    global conn
    response = productsEmpresa(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



#*  ***********************  REPARTIDORES *********************
@app.route('/change-zone', methods=['POST'])
@jwt_required()
def czone():
    global conn
    response = cambiozona(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/comisiones-repartidor', methods=['POST'])
@jwt_required()
def comisionreparti():
    global conn
    response = comisionesgeneradas(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/historialpedidos-repartidor', methods=['POST'])
@jwt_required()
def historialpedrep():
    global conn
    response = historialpedidos(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/perfil-repartidor', methods=['POST'])
@jwt_required()
def perfilrepart():
    global conn
    response = perfilrepartidor(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/selectpedido-repartidor', methods=['POST'])
@jwt_required()
def selpedido():
    global conn
    response = selectpedido(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/entregarpedido-repartidor', methods=['POST'])
@jwt_required()
def entregarpedrep():
    global conn
    response = entregarpedido(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#*  ************************  EMPRESAS   **********************

#*  *********************** ADMINISTRADOR *********************

if __name__ == '__main__':
    app.run(threaded=True,debug=True)
