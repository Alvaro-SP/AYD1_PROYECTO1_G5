from flask import jsonify


def getUsuarios(conn, request):
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM user WHERE state=1;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for usuario in result:
                user = {
                    'id': usuario[0],
                    'name': usuario[1],
                    'mail': usuario[3]
                }

                templist.append(user)

            cursor.close()
            return jsonify({'res': templist, 'message': "Usuarios Cargados"})
        
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})


def removerUsuario(conn, request):
    data = request.get_json()
    id = data['id']

    try:
        with conn.cursor() as cursor:
            sql = "UPDATE user SET state=0 WHERE id=%s"
            cursor.execute(sql, (id,))
            conn.commit()
            cursor.close()

            return jsonify({'res': True, 'message': "El Usuario Se Ha Dado De Baja"})
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})
