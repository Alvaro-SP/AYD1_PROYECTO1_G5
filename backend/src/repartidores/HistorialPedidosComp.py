from flask import jsonify
# ! RETORNA TODOS LOS PEDIDOS COMPLETADOS DE UN REPARTIDOR=================
def historialpedidos(conn, request):
    data = request.get_json()
    idRepartidor = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT pedido.* FROM pedido
            INNER JOIN repartidor on pedido.id = repartidor.id
            WHERE repartidor.id = %s AND pedido.state = 0;
            ''' #* 1 = entregado
            cursor.execute(sql, (idRepartidor))
            result = cursor.fetchall()
            templist = []
            for fila in result:
                atributos = {
                    'id': fila[0],
                    'state': fila[1],
                    'date' : fila[2],
                    'total_price' : fila[3],
                    'address' : fila[6],
                    'payment_method': fila[7],
                    'rate': fila[8]}
                # Cada uno de los pedidos entregados le dará el 5% del valor del pedido al repartidor que realizó la entrega
                templist.append(atributos)
            cursor.close()
            conn.close()
            return jsonify({'res': templist})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False})