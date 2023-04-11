from flask import jsonify
# ! RETORNA TODOS LOS PRODUCTOS DADO ID DE UNA EMPRESA=================
def productsEmpresa(conn, request):
    data = request.get_json()
    idEmpresa = data['id']
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT products.* FROM products
            INNER JOIN empresa on product.empresa_id = empresa.id
            WHERE empresa.id = %s;
            '''
            cursor.execute(sql,(idEmpresa))
            result = cursor.fetchall()
            templist = []
            for fila in result:
                atributos = {'id': fila[0],
                            'name': fila[1],
                            'price' : fila[2],
                            'imagen' : fila[4],
                            'category' : fila[5]}
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
