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
import datetime

#* Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True

#! ------------------- CONNECT WITH DATABASE:-------------------
conn  = mysql.connector.connect(
    user='root',
    password='alvaro',
    host='34.28.45.29',
    database='dbayd',
    port='3306'
)
#* Crea el cursor para ejecutar las consultas
mycursor = conn.cursor()

#! ------------------------- ENDPOINTS -------------------------

#*  ************************ LOGIN ************************
@app.route('/login', methods=['POST'])
def ver_catalogo():
    global conn
    response = login(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
#*  ********************** REGISTRO ************************
@app.route('/register', methods=['POST'])
def ver_catalogo():
    global conn
    response = registro(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
#*  ************************  USUARIOS ************************
@app.route('/getcategories', methods=['GET'])
def getCategories():
    global conn
    response = getCategories(conn)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/empresas-category', methods=['POST'])
def empresacategory():
    global conn
    response = empresaCategoria(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/products-empresa', methods=['POST'])
def empresacategory():
    global conn
    response = productsEmpresa(conn, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
#*  ***********************  REPARTIDORES *********************

#*  ************************  EMPRESAS   **********************

#*  *********************** ADMINISTRADOR *********************

if __name__ == '__main__':
    app.run(threaded=True,debug=True)
