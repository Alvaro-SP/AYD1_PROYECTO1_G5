from flask import jsonify
# ! RETORNA LA INFORMACION DE PERFIL DE UN REPARTIDOR=================
def perfilrepartidor(conn, request):
    data = request.get_json()
    idRepartidor = data['id']
    print(idRepartidor)
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT repartidor.* FROM repartidor
            WHERE repartidor.id = %s AND repartidor.approved = 1;
            ''' #* 1 = repartidor esta aprobado
            cursor.execute(sql, (idRepartidor,))
            result = cursor.fetchall()
            templist = {}
            for fila in result:
                atributos = {
                    'id': fila[0],
                    'name': fila[1],
                    'lastname' : fila[2],
                    'mail' : fila[3],
                    'phone' : fila[4],
                    'depto': fila[5],
                    'city': fila[6],
                    'license': fila[7],
                    'own_transport': fila[8],
                    'cv': fila[9],
                    "password": fila[11]}
                templist=(atributos)
            cursor.close()
            # conn.close()
            print(templist)
            return jsonify({'res': templist, 'message': "Datos personales de repartidor"})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False,'message': str(ex)})

