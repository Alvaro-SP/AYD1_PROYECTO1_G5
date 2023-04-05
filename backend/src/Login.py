from flask import jsonify
def login(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    rol = data['rol'] # admin=0, user=1, repartidor=2, empresa=3
    username=(data['username']).lower()
    password=(data['password']).lower()
    try:
        print('login: '+str(rol))+" -- "+str(username)+" -- "+str(password)
        with conn.cursor() as cursor:
            if rol==0:
                if "admin@gmail.com"==username and "admin"==password:
                    return jsonify({'res':True,'type':0})
            elif rol == 1:
                sql = "SELECT * FROM user WHERE username=%s AND password=%s"
                cursor.execute(sql, (username, password))
                user = cursor.fetchone()
                # Verificar si el usuario existe
                if user:
                    # Retornar usuario
                    return jsonify({
                        "res": True,
                        "user": {
                            "id": user[0],
                            "username": user[1],
                            "password": user[2],
                            "active": user[3],
                            "city": user[4],
                            "depto": user[5],
                            "phone": user[6],
                            "type": 1
                        }
                    })
            elif rol == 2:
                sql = "SELECT * FROM repartidor WHERE mail=%s AND password=%s"
                cursor.execute(sql, (username, password))
                user = cursor.fetchone()
                # Verificar si el usuario existe
                if user:
                    # Retornar usuario
                    return jsonify({
                        "res": True,
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
                        }
                    })
            elif rol == 3:
                sql = "SELECT * FROM empresa WHERE mail=%s AND password=%s"
                cursor.execute(sql, (username, password))
                user = cursor.fetchone()
                # Verificar si el usuario existe
                if user:
                    # Retornar usuario
                    return jsonify({
                        "res": True,
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
                        }
                    })
            cursor.close()
            conn.close()
            return jsonify({'res': False, 'type': 1})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False, 'type': 0})