from flask import jsonify
# ! RETORNA TODOS LOS PEDIDOS COMPLETADOS DE UN USUARIO=================
def historialpedidosUSUARIO(conn, request):
    data = request.get_json()
    idUser = data['id']
    print(idUser)
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT pedido.* ,
            (SELECT repartidor.lastname
            FROM repartidor
            WHERE repartidor.id = repartidor_id) AS name_repartidor,
            (SELECT empresa.name
                    FROM empresa
                    WHERE empresa.id = idEmpresa) AS name_empresa
			FROM pedido
            WHERE user_id = %s AND state = 0;
            '''
            cursor.execute(sql, (idUser,))
            result = cursor.fetchall()
            templist = []
            print(result)
            for fila in result:
                print("*****", str(fila[2]))
                atributos = {
                    'id': fila[0],
                    'state': fila[1],
                    'date' : str(fila[2]),
                    'total_price' : fila[3],
                    'address' : fila[6],
                    'payment_method': fila[7],
                    'rate': fila[8],
                    'name_repartidor': fila[10],
                    'name_empresa': fila[11]}
                # Cada uno de los pedidos entregados le dará el 5% del valor del pedido al repartidor que realizó la entrega
                templist.append(atributos)
            cursor.close()
            print(({'res':templist}))
            # conn.close()
            response= jsonify({'res': templist, 'message': 'pedidos completados'})
            return response
    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})
