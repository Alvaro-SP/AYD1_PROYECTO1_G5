from flask import jsonify
# ! RETORNA TODOS LOS PEDIDOS NO APROBADOS DE USUARIOS=================
def pedidosdeusersempresa(conn, request):
    data = request.get_json()
    idEmpresa = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT pedido.* FROM pedido
            pedido.empresa = %s;
            ''' #* 1 = entregado
            cursor.execute(sql, (idEmpresa))
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
            # conn.close()
            return jsonify({'res': templist})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False})
