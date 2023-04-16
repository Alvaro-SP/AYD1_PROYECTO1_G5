from flask import jsonify
# ! OBTENER TODAS LAS CATEGORIAS DE UN PRODUCTO DE LA EMPRESA=================
def getcategoriaproducto(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT categoryProducto.* FROM categoryProducto
            INNER JOIN products on product.id = categoryProducto.id
            WHERE products.empresa_id = %s;'''
            cursor.execute(sql, (idEmpresa))
            exist = cursor.fetchall()
            templist = []
            for fila in exist:
                atributos = {'id': fila[0],
                            'name': fila[1]}
                templist.append(atributos)
            cursor.close()
            # conn.close()
            return jsonify({'res': templist})
    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
            # conn.close()
        return jsonify({'res': False})
# ! CRUD
# ! AGREGA UNA CATEGORIA DE UN PRODUCTO DE LA EMPRESA=================
def addcategoriaproducto(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    name = data['name']
    price = data['price']
    imagen = data['imagen']
    category = data['category']
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre del producto no exista
            sql = "SELECT * FROM products WHERE name = %s AND empresa_id = %s"
            cursor.execute(sql, (name, idEmpresa))
            exist = cursor.fetchall()
            if len(exist) > 0:
                return jsonify({'res': False, 'reason': 'Ya existe un producto con ese nombre'})
            sql = "INSERT INTO products (name,price,empresa_id,imagen,category) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (name, price, idEmpresa, imagen, category))
            conn.commit()
            print('add product: ',str(name),' -- ',str(idEmpresa),' -- ',str(category))
            return jsonify({'res': True, 'type': 1})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False})
# ! ACTUALIZA CATEGORIA DE UN PRODUCTO DE LA EMPRESA=================
def updatecategoriaproducto(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    name = data['name']
    price = data['price']
    imagen = data['imagen']
    category = data['category']
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre del producto no exista
            sql = "SELECT * FROM products WHERE name = %s AND empresa_id = %s"
            cursor.execute(sql, (name, idEmpresa))
            exist = cursor.fetchall()
            if len(exist) > 1:
                return jsonify({'res': False, 'reason': 'Ya existe un producto con ese nombre'})
            sql = '''
            UPDATE products SET name = %s,
            SET price= %s,
            SET imagen= %s,
            SET category= %s
            WHERE name = %s AND empresa_id = %s
            '''
            cursor.execute(sql, (name, price, imagen, category, name, idEmpresa))
            conn.commit()
            print('update product: ',str(name),' -- ',str(idEmpresa),' -- ',str(category))
            return jsonify({'res': True, 'type': 1})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False})

# ! ELIMINA CATEGORIA DE UN PRODUCTO DE LA EMPRESA=================
def deletecategoriaproducto(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    name = data['name']
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM products WHERE name = %s AND empresa_id = %s"
            cursor.execute(sql, (name, idEmpresa))
            conn.commit()
            print('delete product: ', str(name), ' -- ', str(idEmpresa))
            return jsonify({'res': True, 'type': 1})
    except Exception as ex:
        # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False})