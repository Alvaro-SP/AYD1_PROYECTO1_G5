from flask import jsonify
# ! OBTENER TODAS LAS CATEGORIAS DE UN PRODUCTO DE LA EMPRESA=================
def getcategoriaproducto(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    print(idEmpresa)
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT categoryProduct.* FROM categoryProduct
            WHERE categoryProduct.idEmpresa = %s;'''
            cursor.execute(sql, (idEmpresa,))
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
        return jsonify({'res': False,'message': str(ex)})
# ! CRUD
# ! AGREGA UNA CATEGORIA DE UN PRODUCTO DE LA EMPRESA=================
def addcategoriaproducto(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    name = data['name']
    try:
        with conn.cursor() as cursor:
            # verificar que el nombre de la categoria no exista
            sql = "SELECT * FROM categoryProduct WHERE name = %s AND idEmpresa = %s"
            cursor.execute(sql, (name, idEmpresa))
            exist = cursor.fetchall()
            if len(exist) > 0:
                return jsonify({'res': False, 'message': 'Ya existe una categoria con ese nombre'})
            sql = "INSERT INTO categoryProduct (name,idEmpresa) VALUES (%s, %s)"
            cursor.execute(sql, (name, idEmpresa))
            conn.commit()
            print('add product: ',str(name),' -- ',str(idEmpresa),' -- ')
            return jsonify({'res': True,'message':'Se agrego la categoria correctamente'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False,'message': str(ex)})
