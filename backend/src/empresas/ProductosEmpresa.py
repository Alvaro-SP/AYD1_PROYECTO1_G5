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
    categoryProduct_id = data['categoryProduct_id']
    disponibilidad = data['disponibilidad']
    description = data['description']

    try:
        with conn.cursor() as cursor:
            # verificar que el nombre del producto no exista
            sql = "SELECT * FROM products WHERE name = %s AND empresa_id = %s"
            cursor.execute(sql, (name, idEmpresa))
            exist = cursor.fetchall()
            if len(exist) > 0:
                return jsonify({'res': False, 'reason': 'Ya existe un producto con ese nombre'})
            sql = "INSERT INTO products (name,price,empresa_id,imagen,category,categoryProduct_id,disponibilidad,description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (name, price, idEmpresa, imagen, category,categoryProduct_id,disponibilidad,description ))
            conn.commit()
            print('add product: ',str(name),' -- ',str(idEmpresa),' -- ',str(category))
            return jsonify({'res': True, 'type': 1})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})
# ! ACTUALIZA UN PRODUCTO DE UNA EMPRESA=================
def updateproduct(conn, request):
    data = request.get_json()
    idProducto = data['id']
    name = data['name']
    price = data['price']
    imagen = data['imagen']
    category = data['category']
    categoryProduct_id = data['categoryProduct_id']
    disponibilidad = data['disponibilidad']
    description = data['description']
    print(data)
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre del producto no exista
            sql = '''
            UPDATE products
            SET name = %s,
            price= %s,
            imagen= %s,
            category= %s,
            categoryProduct_id= %s,
            disponibilidad= %s,
            description= %s
            WHERE products.id = %s
            '''
            cursor.execute(sql, (name, price, imagen, category,categoryProduct_id,disponibilidad,description,idProducto))
            conn.commit()
            print('update product: ',str(name),' -- ',str(idProducto),' -- ',str(category))
            return jsonify({'res': True, 'type': 1})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})

# ! ELIMINA UN PRODUCTO DE UNA EMPRESA=================
def deleteproduct(conn, request):
    data = request.get_json()
    idProducto = data['id']
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM products WHERE id = %s "
            cursor.execute(sql, (idProducto,))
            conn.commit()
            print('delete product')
            return jsonify({'res': True, 'type': 1})
    except Exception as ex:
        # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)}) 