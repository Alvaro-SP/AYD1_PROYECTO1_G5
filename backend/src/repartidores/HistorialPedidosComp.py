from flask import jsonify
# ! RETORNA TODOS LOS PEDIDOS COMPLETADOS DE UN REPARTIDOR=================
def historialpedidosNAMEUSER(conn, request):
    data = request.get_json()
    idRepartidor = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT pedido.*,
                (SELECT user.name
                    FROM user
                    WHERE user.id = pedido.user_id) AS name_user,
                    (SELECT user.mail
                    FROM user
                    WHERE user.id = pedido.user_id) AS mail_user
            FROM pedido
            WHERE repartidor_id = %s;
            ''' #* 1 = entregado
            cursor.execute(sql, (idRepartidor,))
            result = cursor.fetchall()
            templist = []
            comisiontotal=0
            for fila in result:
                atributos = {
                    'id': fila[0],
                    'state': fila[1],
                    'date' : fila[2],
                    'total_price' : fila[3],
                    'address' : fila[6],
                    'payment_method': fila[7],
                    'rate': fila[8],
                    'name_user': fila[10],
                    'mail_user': fila[11],
                    'comision': fila[3] * 0.05}
                comisiontotal+=fila[3] * 0.05
                # Cada uno de los pedidos entregados le dará el 5% del valor del pedido al repartidor que realizó la entrega
                templist.append(atributos)
            cursor.close()
            # conn.close()
            return jsonify({'res': templist, 'comisiontotal': comisiontotal, 'message': 'pedidos completados'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})
