from flask import jsonify
# ! RETORNA TODAS LAS EMPRESAS DADA UNA CATEGORIA=================
def empresaCategoria(conn):
    # ! -------------- taking the data ----------------
    # data = request.get_json()
    # idCategory = data['id']
    try:
        with conn.cursor() as cursor:
            sql = '''
            SELECT empresa.* FROM empresa
            WHERE empresa.approved = 1;
            '''
            cursor.execute(sql,)
            result = cursor.fetchall()
            templist = []
            for fila in result:
                categoria=''
                if fila[3]==1:
                    categoria = 'Restaurantes y Comida Rapida'
                elif fila[3]==2:
                    categoria = 'Cafeterias'
                elif fila[3]==3:
                    categoria = 'Tiendas de Conveniencia'
                elif fila[3]==4:
                    categoria = 'Supermercados'
                atributos = {
                    'id': fila[0],
                    'name': fila[1],
                    'description' : fila[2],
                    'category' : categoria,
                    'mail' : fila[4],
                    'depto' : fila[5],
                    'municipio' : fila[6],
                    'imagen':fila[9]
                    }
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
