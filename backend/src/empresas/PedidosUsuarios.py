from flask import jsonify
#* 3=CARRITO DE COMPRA
#* 2=pedidos que estan en espera
#* 1=ocupado, (pedido en curso)
#* 0=entregado | CANCELADO  (esta libre el pana)
#* 4 revisar si es necesario este estado y si es asi
     #* solamente se usaria en la EMPRESA
# ! RETORNA TODOS LOS PEDIDOS NO APROBADOS DE USUARIOS=================
def pedidosdeusersempresa(conn, request):
    data = request.get_json()
    idEmpresa = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT pedido.*, products.*
            FROM pedido
            INNER JOIN detail_pedido ON pedido.id = detail_pedido.pedido_id
            INNER JOIN products ON detail_pedido.products_id = products.id
            WHERE pedido.idEmpresa = %s;
            ''' #* toma pedidos en espera y que sean de la empresa
            cursor.execute(sql, (idEmpresa,))
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

# ! CONFIRMA EL PEDIDO PARA SU PREPARACION=================
def confirmarpedido(conn, request):
    data = request.get_json()
    idPedido = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            UPDATE pedido
            SET state = 4
            WHERE pedido.id = %s
            '''
            cursor.execute(sql, (idPedido,))
            conn.commit()
            cursor.close()
            # conn.close()
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False})

#! MARCA EL PEDIDO COMO PREPARADO O ENVIADO=================
def prepararpedido(conn, request):
    data = request.get_json()
    idPedido = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            UPDATE pedido
            SET state = 2
            WHERE pedido.id = %s
            ''' #* 1 = entregado
            cursor.execute(sql, (idPedido,))
            conn.commit()
            cursor.close()
            # conn.close()
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False})