from flask import jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                            unset_jwt_cookies, jwt_required, JWTManager

def login(conn, request, jwt):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    rol = int(data['rol']) # admin=0, user=1, repartidor=2, empresa=3
    username=(data['email']).lower()
    password=(data['pass']).lower()
    try:
        print('login: ',str(rol)," -- ",str(username)," -- ",str(password))
        with conn.cursor() as cursor:
            if rol == 0:
                if "admin@gmail.com" == username and "admin" == password:
                    access_token = create_access_token(identity=username)
                    return jsonify({'res': True, 'access_token': access_token, 'message': 'Bienvenido senor Admin, quisiera desafiarlo.'})

            elif rol == 1:
                sql = "SELECT * FROM user WHERE mail=%s AND password=%s"
                cursor.execute(sql, (username, password))
                user = cursor.fetchone()
                cursor.fetchall()
                # Verificar si el usuario existe
                if user:
                    access_token = create_access_token(identity=username)
                    # Retornar usuario
                    return jsonify({
                        "res": True,
                        "access_token":access_token,
                        "user": {
                            "id": user[0],
                            "name": user[1],
                            "password": user[2],
                            "mail": user[3]
                        },
                        "message": "Hola usuario usted se ha logueado exitosamente"
                    })
            elif rol == 2:
                sql = "SELECT * FROM repartidor WHERE mail=%s AND password=%s AND repartidor.approved = 1"
                cursor.execute(sql, (username, password))
                user = cursor.fetchone()
                cursor.fetchall()
                # Verificar si el usuario existe
                if user:
                    access_token = create_access_token(identity=username)
                    # Retornar usuario
                    return jsonify({
                        "res": True,
                        "access_token":access_token,
                        "user": {
                            "id": user[0],
                            "name": user[1],
                            "lastname": user[2],
                            "mail": user[3],
                            "phone": user[4],
                            "depto": user[5],
                            "city": user[6],
                            "license": user[7],
                            "own_transport": user[8],
                            "cv": user[9],
                            "approved": user[10],
                            "password": user[11],
                            "type": 2
                        },
                        "message": "Que tal joven repartidor se ha logueado exitosamente"
                    })
            elif rol == 3:
                sql = "SELECT * FROM empresa WHERE mail=%s AND password=%s"
                cursor.execute(sql, (username, password))
                user = cursor.fetchone()
                cursor.fetchall()
                # Verificar si el usuario existe
                if user:
                    access_token = create_access_token(identity=username)
                    # Retornar usuario
                    return jsonify({
                        "res": True,
                        "access_token":access_token,
                        "user": {
                            "id": user[0],
                            "name": user[1],
                            "description": user[2],
                            "category": user[3],
                            "mail": user[4],
                            "depto": user[5],
                            "zone": user[6],
                            "municipio": user[7],
                            "approved": user[8],
                            "password": user[9],
                            "type": 3
                        },
                        "message": "Que hay de nuevo Empresa, se ha logueado exitosamente"
                    })
            cursor.close()
            # conn.close()
            return jsonify({'res': False, 'message': 'Usuario o contraseña incorrectos esta Baneado'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'type': 0, 'message': str(ex)})