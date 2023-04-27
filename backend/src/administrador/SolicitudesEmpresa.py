from flask import jsonify
from io import BytesIO

def solicitudEmpresa(conn, request):
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM empresa;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for empresa in result:
                # Convertir el objeto BLOB en un archivo PDF
                docauth = BytesIO(empresa[11])
                docreg = BytesIO(empresa[12])
                docregsan = BytesIO(empresa[13])
                emp = {
                    'id': empresa[0],
                    'name': empresa[1],
                    'description': empresa[2],
                    'category': empresa[3],
                    'mail': empresa[4],
                    'depto': empresa[5],
                    'municipio': empresa[6],
                    'approved': empresa[7],
                    'docauth': docauth,
                    'docreg': docreg,
                    'docregsan': docregsan
                }

                templist.append(emp)
            cursor.close()
            return jsonify({'res': templist, 'message': "Empresas Cargadas"})

    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})


def cambiarEstadoEmpresa(conn, request):
    data = request.get_json()
    id = data['id']
    state = data['state']
    # ! state -> 1 Aceptar || state -> 2 Funar

    try:
        with conn.cursor() as cursor:
            # ? VALIDACION DE QUE NO TENGA PENDIENTES
            if (state == 2):
                sql = "SELECT * from pedido WHERE state=1 AND empresa=%s"
                cursor.execute(sql, (id))
                result = cursor.fetchone()
                if result:
                    return jsonify({'res': False, 'message': 'La Empresa Se Encuentra Ocupada Aun'})

            # ? ACTUALIZACION DE ESTADO
            sql = "UPDATE empresa SET approved=%s WHERE id=%s;"
            cursor.execute(sql, (state, id))
            conn.commit()
            cursor.close()

            message = ""
            if (state == 1):
                message = "La Empresa Ha Sido Aceptada"
            elif (state == 2):
                message = "La Empresa Se Ha Dado De Baja"

            return jsonify({'res': True, 'message': message})
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})
