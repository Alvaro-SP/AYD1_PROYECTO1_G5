from flask import jsonify


def solicitudUbicacionRep(conn, request):
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM repartidor WHERE solizone=1;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for solicitud in result:
                sol = {
                    'id': solicitud[0],
                    'name': solicitud[1],
                    'lastname': solicitud[2],
                    'deptoActual': solicitud[5],
                    'cityActual': solicitud[6],
                    'deptoNew': solicitud[13],
                    'cityNew': solicitud[14]
                }

                templist.append(sol)
            cursor.close()
            return jsonify({'res': templist, 'message': 'Solicitudes Cargadas'})
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})


def confirmarUbicaionNueva(conn, request):
    data = request.get_json()
    id = data['id']
    state = data['state']
    """ depto = data['depto']
    city = data['city'] """
    # ! state 0 -> Aprobado || state 1 ->  Se La Suda

    try:
        with conn.cursor() as cursor:
            message = ""

            if state == 0:
                sql = "UPDATE repartidor SET depto=deptotemp, city=citytemp, solizone=0 WHERE id=%s;"
                cursor.execute(sql, (id))
                conn.commit()
                cursor.close()
                message = "La Solicitud Se Ha Actualizado Correctamente"
            else:
                sql = "UPDATE repartidor SET solizone=0 WHERE id=%s;"
                cursor.execute(sql, (id))
                conn.commit()
                cursor.close()
                message = "La Solicitud Se Ha Rechazado Correctamente"

            return jsonify({'res': True, 'message': message})
        
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})
