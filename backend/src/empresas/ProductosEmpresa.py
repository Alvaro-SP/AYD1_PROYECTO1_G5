from flask import jsonify
# ! CRUD
# ! AGREGA UN PRODUCTO DE UNA EMPRESA=================
def addproduct(conn, request):
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
        # if conn:
        #     conn.close()
        return jsonify({'res': False})
# ! ACTUALIZA UN PRODUCTO DE UNA EMPRESA=================
def updateproduct(conn, request):
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
        # if conn:
        #     conn.close()
        return jsonify({'res': False})

# ! ELIMINA UN PRODUCTO DE UNA EMPRESA=================
def deleteproduct(conn, request):
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
        # if conn:
        #     conn.close()
        return jsonify({'res': False})