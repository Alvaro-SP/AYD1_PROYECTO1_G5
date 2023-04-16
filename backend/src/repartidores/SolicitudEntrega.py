from flask import jsonify
# ! RETORNA LOS PEDIDOS NO ENTREGADOS DADO ID DEL REPARTIDOR=================
def historialpedidos(conn, request):
    data = request.get_json()
    idRepartidor = data['id']
    flag_busy = False #* flag para saber si el repartidor tiene un pedido en curso
    try:
        with conn.cursor() as cursor:
            # ! validar si el repartidor tiene un pedido en curso
            sql = '''
            SELECT pedido.* FROM pedido
            INNER JOIN repartidor ON pedido.id = repartidor.id
            WHERE repartidor.id = %s AND pedido.state = 1;
            '''#* 1 = entregado
            cursor.execute(sql, (idRepartidor))
            isbusy = cursor.fetchone()
            cursor.fetchall()
            if isbusy:
                print("Delivery is in process")
                flag_busy = {
                    'id': isbusy[0],
                    'state': isbusy[1],
                    'date' : isbusy[2],
                    'total_price' : isbusy[3],
                    'address' : isbusy[6],
                    'payment_method': isbusy[7],
                    'rate': isbusy[8]}
            # ! sino tiene entonces retorna los pedidos no entregados
            sql = '''
            SELECT pedido.* FROM pedido
            INNER JOIN repartidor on pedido.id = repartidor.id
            WHERE repartidor.id = %s AND pedido.state = 2;
            ''' #* 2 = pedidos en espera
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
            # conn.close()
            return jsonify({'res': templist, 'enproceso': flag_busy})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False})
# ! CAMBIA EL ESTADO DE UN PEDIDO A OCUPADO (pedido en curso)=================
def selectpedido(conn, request):
    data = request.get_json()
    idPedido = data['id']
    try:
        with conn.cursor() as cursor:
            #*  state=2  --> pedidos que estan en espera
            #*  state=1  --> ocupado, (pedido en curso)
            #*  state=0  --> entregado | CANCELADO  (esta libre el pana)
            sql = "UPDATE pedido SET state = 1 WHERE id = %s"
            cursor.execute(sql, (idPedido))
            conn.commit()
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        if conn:
            conn.close()
        return jsonify({'res': False})
# ! CAMBIA EL ESTADO DE UN PEDIDO A ENTREGADO O CANCELADO=================
def entregarpedido(conn, request):
    data = request.get_json()
    idPedido = data['id']
    try:
        with conn.cursor() as cursor:
            #*  state=2  --> pedidos que estan en espera
            #*  state=1  --> ocupado, (pedido en curso)
            #*  state=0  --> entregado | CANCELADO  (esta libre el pana)
            sql = "UPDATE pedido SET state = 0 WHERE id = %s"
            cursor.execute(sql, (idPedido))
            conn.commit()
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        if conn:
            conn.close()
        return jsonify({'res': False})
