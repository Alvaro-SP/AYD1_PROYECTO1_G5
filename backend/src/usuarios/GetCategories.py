from flask import jsonify
# ! RETORNA LAS CATEGORIAS DE LAS EMPRESAS=================
def getCategories(conn):
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM category;"
            cursor.execute(sql, )
            result = cursor.fetchall()
            templist = []
            for fila in result:
                atributos = {'id': fila[0], 'name': fila[1], 'imagen' : fila[2]}
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
