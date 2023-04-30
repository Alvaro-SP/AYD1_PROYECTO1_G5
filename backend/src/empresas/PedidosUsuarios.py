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
            SELECT pedido.*, products.*,
            (
                SELECT user.name FROM user 
                WHERE user.id = pedido.user_id
            ) AS name_user,
            (
                SELECT user.mail FROM user 
                WHERE user.id = pedido.user_id
            ) AS mail_user
            FROM pedido
            INNER JOIN detail_pedido ON pedido.id = detail_pedido.pedido_id
            INNER JOIN products ON detail_pedido.products_id = products.id
            WHERE pedido.idEmpresa = %s ;
            ''' #* toma pedidos en espera y que sean de la empresa
            cursor.execute(sql, (idEmpresa,))
            result = cursor.fetchall()
            # Crear un diccionario para almacenar los detalles de los pedidos y los productos
            pedidos = {}

            for fila in result:
                pedido_id = fila[0]
                if pedido_id not in pedidos:
                    pedidos[pedido_id] = {
                        'id': fila[0],
                        'state': fila[1],
                        'date' : fila[2],
                        'total_price' : fila[3],
                        'address' : fila[6],
                        'payment_method': fila[7],
                        'rate': fila[8],
                        'name_user': fila[19],
                        'mail_user': fila[20],
                        'products': []
                    }
                pedidos[pedido_id]['products'].append({
                    'id': fila[10],
                    'name': fila[11],
                    'price': fila[12],
                    'empresa_id': fila[13],
                    'imagen': fila[14],
                    'category': fila[15],
                    'categoryProduct_id': fila[16],
                    'disponibilidad': fila[17],
                    'description': fila[18]
                })
            # Convertir el diccionario de pedidos en una lista de objetos JSON
            resultado_json = []
            for pedido in pedidos.values():
                resultado_json.append({"pedido": pedido})
            cursor.close()
            # conn.close()
            return jsonify({'res': resultado_json, 'message':'Pedidos'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message':str(ex)})

# ! CONFIRMA EL PEDIDO PARA SU PREPARACION=================
def confirmarpedido(conn, request):
    data = request.get_json()
    idPedido = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            UPDATE pedido
            SET state = 3
            WHERE pedido.id = %s
            '''
            cursor.execute(sql, (idPedido,))
            conn.commit()
            cursor.close()
            # conn.close()
            return jsonify({'res': True, 'message':'Pedido confirmado'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message':str(ex)})

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
            return jsonify({'res': True, 'message':'Pedido preparado'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message':str(ex)})