from flask import jsonify
# ! RETORNA TODAS LAS EMPRESAS DADA UNA CATEGORIA=================
def empresaCategoria(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    idCategory = data['id']
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT empresa.* FROM empresa
            INNER JOIN category on empresa.category_id = category.id
            WHERE category.id = %s;
            '''
            cursor.execute(sql,(idCategory))
            result = cursor.fetchall()
            templist = []
            for fila in result:
                atributos = {
                    'id': fila[0],
                    'name': fila[1],
                    'description' : fila[2],
                    'category' : fila[3],
                    'mail' : fila[4],
                    'depto' : fila[5],
                    'zone' : fila[6],
                    'municipio' : fila[7],
                    'approved' : fila[8],
                    'password' : fila[9]
                    }
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
