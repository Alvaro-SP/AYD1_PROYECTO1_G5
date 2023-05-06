from flask import jsonify
# ! CRUD
# ! AGREGA UN PRODUCTO DE UNA EMPRESA=================
def addCombo(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    name = data['name']
    price = data['price']
    imagen = data['imagen']
    disponibilidad = data['disponibilidad']
    description = data['description']
    products = data['products']
    
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre del producto no exista
            sql = "SELECT * FROM ofertas_combos WHERE nombre = %s AND empresa_id = %s"
            cursor.execute(sql, (name, idEmpresa))
            exist = cursor.fetchall()
            if len(exist) > 0:
                return jsonify({'res': False, 'reason': 'Ya existe un combo con ese nombre'})
            sql = "INSERT INTO ofertas_combos (nombre,price,empresa_id,imagen,stock,description) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (name, price, idEmpresa, imagen,disponibilidad,description ))
            last_id = cursor.lastrowid
            conn.commit()
            print(last_id)
            for pr in products:
                sql = "INSERT INTO detail_ofertacombo(cant,name,ofertas_combos_id) VALUES (%s,%s,%s)"
                
                cursor.execute(sql, (pr['cantidad'],pr['nombre'],last_id))
                conn.commit()
            sql = "INSERT INTO products (name,price,empresa_id,imagen,category,categoryProduct_id,disponibilidad,description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (name+"-"+str(last_id), price, idEmpresa, imagen, "Combo",22,disponibilidad,description))
            conn.commit()
            return jsonify({'res': True, 'type': 1,'message': 'Se agrego el combo'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})
# ! ACTUALIZA UN PRODUCTO DE UNA EMPRESA=================
def updatecombo(conn, request):
    data = request.get_json()
    id = data['id']
    name = data['name']
    price = data['price']
    imagen = data['imagen']
    disponibilidad = data['disponibilidad']
    description = data['description']
    peliminar = data['peliminar']
    pmodificar = data['pmodificar']
    pnuevos = data['pnuevos']
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre del producto no exista
            sql = '''
            UPDATE ofertas_combos
            SET price = %s,
            nombre= %s,
            description= %s,
            stock= %s,
            imagen= %s
            WHERE ofertas_combos.id = %s
            '''
            cursor.execute(sql, (price, name, description,disponibilidad,imagen,id))
            conn.commit()
            for pr in pnuevos:
                sql = "INSERT INTO detail_ofertacombo(cant,name,ofertas_combos_id) VALUES (%s,%s,%s)"
                
                cursor.execute(sql, (pr['cantidad'],pr['nombre'],id))
                conn.commit()
            for pr in pmodificar:
                sql = '''
                UPDATE detail_ofertacombo
                SET cant = %s,
                name= %s
                WHERE detail_ofertacombo.id = %s
                '''
                
                cursor.execute(sql, (pr['cant'],pr['name'],pr['id']))
                conn.commit() 
            for pr in peliminar:
                sql = "DELETE FROM detail_ofertacombo WHERE id = %s "
                
                cursor.execute(sql, (pr['id'],))
                conn.commit() 
            return jsonify({'res': True, 'type': 1,'message':'Se edito el combo'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})

# ! ELIMINA UN PRODUCTO DE UNA EMPRESA=================
def deletecombo(conn, request):
    data = request.get_json()
    idProducto = data['id']
    nombre = data['nombre']
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM detail_ofertacombo WHERE ofertas_combos_id = %s "
            cursor.execute(sql, (idProducto,))
            conn.commit()
            sql = "DELETE FROM ofertas_combos WHERE id = %s "
            cursor.execute(sql, (idProducto,))
            conn.commit()
            conn.commit()
            sql = "DELETE FROM products WHERE name = %s "
            cursor.execute(sql, (nombre+"-"+str(idProducto),))
            conn.commit()

            return jsonify({'res': True, 'type': 1,'message': "Se elimino el combo"})
    except Exception as ex:
        # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)}) 
    
def getCombobyEmpresa(conn,request):
    try:
        data = request.get_json()
        empresa_id = data['id']
        print(empresa_id)
        with conn.cursor() as cursor:
            sql = '''SELECT ofertas_combos.*,detail_ofertacombo.*
            FROM ofertas_combos
			left JOIN detail_ofertacombo ON detail_ofertacombo.ofertas_combos_id = ofertas_combos.id
            where ofertas_combos.empresa_id =%s;'''
            cursor.execute(sql, (empresa_id,))
            print("holas aqui llego no?")
            result = cursor.fetchall()
            combos = {}

            for fila in result:
                pedido_id = fila[0]
                if pedido_id not in combos:
                    combos[pedido_id] = {
                        'id': fila[0],
                        'price': fila[1],
                        'nombre' : fila[3],
                        'description' : fila[4],
                        'stock' : fila[5],
                        'imagen': fila[6],
                        'products': []
                    }
                combos[pedido_id]['products'].append({
                    'id': fila[7],
                    'cant': fila[8],
                    'name': fila[9]
                })
            # Convertir el diccionario de combos en una lista de objetos JSON
            resultado_json = []
            for pedido in combos.values():
                resultado_json.append(pedido)
            cursor.close()
            # conn.close()
            return jsonify({'res': resultado_json, 'message':'Pedidos'})
            # conn.close()
            return jsonify({'res': templist})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
            # conn.close()
        return jsonify({'res': False})
    
def getOfertasbyEmpresa(conn,request):
    try:
        data = request.get_json()
        empresa_id = data['id']
        print(empresa_id)
        with conn.cursor() as cursor:
            sql = '''SELECT products.*,oferta.id as 'idOferta',oferta.price as 'nuevoPrice'
            FROM oferta
			INNER JOIN products ON products.id = oferta.idProducto
            where products.empresa_id =%s;'''
            cursor.execute(sql, (empresa_id,))

            result = cursor.fetchall()
            combos = {}

            for fila in result:
                pedido_id = fila[0]
                if pedido_id not in combos:
                    combos[pedido_id] = {
                        'id': fila[0],
                        'name': fila[1],
                        'price' : fila[2],
                        'empresa_id' : fila[3],
                        'imagen' : fila[4],
                        'category': fila[5],
                        'disponibilidad': fila[7],
                        'description': fila[8],
                        'idOferta': fila[9],
                        'nuevoPrice': fila[10],
                    }
            # Convertir el diccionario de combos en una lista de objetos JSON
            resultado_json = []
            for pedido in combos.values():
                resultado_json.append(pedido)
            cursor.close()
            # conn.close()
            return jsonify({'res': resultado_json, 'message':'Pedidos'})
            # conn.close()
            return jsonify({'res': templist})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
            # conn.close()
        return jsonify({'res': False})

def addOferta(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    price = data['price']
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre de la categoria no exista
            sql = "SELECT * FROM oferta WHERE idProducto = %s"
            cursor.execute(sql, (idEmpresa,))
            exist = cursor.fetchall()
            if len(exist) > 0:
                return jsonify({'res': False, 'message': 'Ya existe una oferta con ese producto'})
            sql = "INSERT INTO oferta (price,idProducto) VALUES (%s, %s)"
            cursor.execute(sql, (price, idEmpresa))
            conn.commit()
            return jsonify({'res': True,'message':'Se agrego la oferta correctamente'})
    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False,'message': str(ex)})

def updateOferta(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    price = data['price']
    print(idEmpresa)
    print(price)
    try:
        with conn.cursor() as cursor:
            
            sql = ''' UPDATE oferta
            SET price = %s
            WHERE oferta.id = %s'''
            cursor.execute(sql, (price, idEmpresa))
            conn.commit()
            return jsonify({'res': True,'message':'Se modifico la oferta correctamente'})
    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False,'message': str(ex)})

def deleteOferta(conn, request):
    data = request.get_json()
    idProducto = data['id']
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM oferta WHERE id = %s "
            cursor.execute(sql, (idProducto,))
            conn.commit()
            return jsonify({'res': True, 'type': 1,'message': "Se elimino la oferta"})
    except Exception as ex:
        # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)}) 
    
def reporte(conn, request):
    data = request.get_json()
    idRepartidor = data['id']
    print(idRepartidor)
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
            WHERE pedido.idEmpresa = %s and pedido.state=0;
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
                    'mail_user': fila[11]}
                comisiontotal+=int(fila[3]);
                # Cada uno de los pedidos entregados le dará el 5% del valor del pedido al repartidor que realizó la entrega
                templist.append(atributos)
            sql = '''
            SELECT detail_pedido.*,
            (
                SELECT products.name FROM products 
                WHERE products.id = detail_pedido.products_id
            ) AS nameProduct
            FROM pedido
            INNER JOIN detail_pedido ON pedido.id = detail_pedido.pedido_id
            INNER JOIN products ON detail_pedido.products_id = products.id
            WHERE pedido.idEmpresa = %s ;
            ''' #* 1 = entregado
            cursor.execute(sql, (idRepartidor,))
            result = cursor.fetchall()
            
            pedidos = {}

            for fila in result:
                pedido_id = fila[3]
                if pedido_id not in pedidos:
                    pedidos[pedido_id] = {
                        'id': fila[3],
                        'name': fila[4],
                        'cant' : fila[1]
                    }
                pedidos[pedido_id]['cant'] = pedidos[pedido_id]['cant']+fila[1]
            cursor.close()
            resultado_json = []
            for pedido in pedidos.values():
                resultado_json.append(pedido)
            # conn.close()
            return jsonify({'res': templist, 'comisiontotal': comisiontotal, 'top':resultado_json,'message': 'pedidos completados'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})

def reportefecha(conn, request):
    data = request.get_json()
    idRepartidor = data['id']
    fecha =data['fecha']
    print(idRepartidor)
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
            WHERE pedido.idEmpresa = %s and pedido.date=%s and pedido.state=0;
            ''' #* 1 = entregado
            cursor.execute(sql, (idRepartidor,fecha))
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
                    'mail_user': fila[11]}
                comisiontotal+=int(fila[3]);
                # Cada uno de los pedidos entregados le dará el 5% del valor del pedido al repartidor que realizó la entrega
                templist.append(atributos)
            sql = '''
            SELECT detail_pedido.*,
            (
                SELECT products.name FROM products 
                WHERE products.id = detail_pedido.products_id
            ) AS nameProduct
            FROM pedido
            INNER JOIN detail_pedido ON pedido.id = detail_pedido.pedido_id
            INNER JOIN products ON detail_pedido.products_id = products.id
            WHERE pedido.idEmpresa = %s and pedido.date=%s;
            ''' #* 1 = entregado
            cursor.execute(sql, (idRepartidor,fecha))
            result = cursor.fetchall()
            
            pedidos = {}

            for fila in result:
                pedido_id = fila[3]
                if pedido_id not in pedidos:
                    pedidos[pedido_id] = {
                        'id': fila[3],
                        'name': fila[4],
                        'cant' : fila[1]
                    }
                pedidos[pedido_id]['cant'] = pedidos[pedido_id]['cant']+fila[1]
            cursor.close()
            resultado_json = []
            for pedido in pedidos.values():
                resultado_json.append(pedido)
            # conn.close()
            return jsonify({'res': templist, 'comisiontotal': comisiontotal, 'top':resultado_json,'message': 'pedidos completados'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})
def historialusuario(conn, request):
    data = request.get_json()
    idEmpresa = data['id']

    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT pedido.*, products.*,
            (
                SELECT repartidor.name FROM repartidor 
                WHERE repartidor.id = pedido.repartidor_id
            ) AS name_user,
            (
                SELECT empresa.name FROM empresa 
                WHERE empresa.id = pedido.idEmpresa
            ) AS mail_user
            FROM pedido
            INNER JOIN detail_pedido ON pedido.id = detail_pedido.pedido_id
            INNER JOIN products ON detail_pedido.products_id = products.id
            WHERE pedido.user_id = %s ;
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
                resultado_json.append(pedido)
            cursor.close()
            # conn.close()
            return jsonify({'res': resultado_json, 'message':'Pedidos'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message':str(ex)})