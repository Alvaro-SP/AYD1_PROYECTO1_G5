from flask import jsonify
# ! RETORNA TODOS LOS PRODUCTOS DADO ID DE UNA EMPRESA=================
def productsEmpresa(conn, request):
    data = request.get_json()
    idEmpresa = str(data['id'])
    print(idEmpresa)
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT products.* FROM products
            INNER JOIN empresa on products.empresa_id = empresa.id
            WHERE empresa.id = %s;
            '''
            cursor.execute(sql,(idEmpresa,))
            result = cursor.fetchall()
            print(result)
            templist = []
            for fila in result:
                atributos = {'id': fila[0],
                            'name': fila[1],
                            'precio' : fila[2],
                            'imagen' : fila[4],
                            'categoria' : fila[5],
                            'categoryProduct_id' : fila[6],
                            'disponibilidad' : fila[7],
                            'description' : fila[8]}
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