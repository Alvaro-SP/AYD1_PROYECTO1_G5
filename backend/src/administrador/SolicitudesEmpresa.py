from flask import jsonify
from datetime import datetime
import base64

def solicitudEmpresa(conn, request):
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM empresa;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for empresa in result:
                # Convertir el objeto BLOB en un archivo PDF
                docauth = base64.b64encode(empresa[11]).decode('utf-8') if empresa[11] is not None else None
                docreg = base64.b64encode(empresa[12]).decode('utf-8') if empresa[12] is not None else None
                docregsan = base64.b64encode(empresa[13]).decode('utf-8') if empresa[13] is not None else None

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
                if docauth is not None:
                    emp['docauth'] = docauth

                if docreg is not None:
                    emp['docreg'] = docreg

                if docregsan is not None:
                    emp['docregsan'] = docregsan

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
    justificacion = ""
    now = ""
    # ! state -> 1 Aceptar || state -> 2 Funar

    try:
        with conn.cursor() as cursor:
            formatted_date = None
            # ? VALIDACION DE QUE NO TENGA PENDIENTES
            if (state == 2):
                sql = "SELECT * from pedido WHERE state=1 AND empresa=%s"
                cursor.execute(sql, (id, ))
                result = cursor.fetchone()
                if result:
                    return jsonify({'res': False, 'message': 'La Empresa Se Encuentra Ocupada Aun'})

                justificacion = data['justificacion']
                now = datetime.now()
                formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
                print(formatted_date, "FECHA")

            # ? ACTUALIZACION DE ESTADO
            sql = "UPDATE repartidor SET approved=%s, datefuna=%s, justificacion=%s WHERE id=%s;"
            cursor.execute(sql, (state, formatted_date, justificacion, id))
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
