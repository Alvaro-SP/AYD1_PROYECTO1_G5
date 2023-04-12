from flask import jsonify
# ! CAMBIA LA ZONA DEL REPARTIDOR=================
def cambiozona(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    idRepartidor = data['id'] # admin=0, user=1, repartidor=2, empresa=3
    depto=(data['depto']).lower()
    try:
        with conn.cursor() as cursor:
            sql = "UPDATE repartidor SET depto = %s WHERE id = %s"
            cursor.execute(sql, (depto, idRepartidor))
            conn.commit()
            print('cambio de zona: ',str(depto),' -- repartidor: ',str(idRepartidor))
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        if conn:
            conn.close()
        return jsonify({'res': False})
