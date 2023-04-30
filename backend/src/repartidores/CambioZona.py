from flask import jsonify
# ! SOLICITA CAMBIO LA ZONA DEL REPARTIDOR=================
def solicambiozona(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    idRepartidor = data['id'] # admin=0, user=1, repartidor=2, empresa=3
    depto=(data['depto'])
    city=(data['city'])

    try:
        with conn.cursor() as cursor:
            sql = "UPDATE repartidor SET deptotemp = %s, citytemp = %s, solizone = 1 WHERE id = %s"
            cursor.execute(sql, (depto, city, idRepartidor))
            conn.commit()
            print('Solicitud de cambio de zona: ',str(depto),' -- repartidor: ',str(idRepartidor))
            return jsonify({'res': True, 'message': "Solicitud realizada"})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})

# ! CAMBIA LA ZONA DEL REPARTIDOR=================
def cambiozona(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    idRepartidor = data['id'] # admin=0, user=1, repartidor=2, empresa=3

    try:
        with conn.cursor() as cursor:
            sql = "UPDATE repartidor SET depto = deptotemp, city = citytemp WHERE id = %s"
            cursor.execute(sql, (idRepartidor,))
            conn.commit()
            print('cambio de zona: ',str(idRepartidor))
            return jsonify({'res': True, 'message': "Cambio de zona realizado"})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})