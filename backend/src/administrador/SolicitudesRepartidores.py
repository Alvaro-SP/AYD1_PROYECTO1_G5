from flask import jsonify
import base64


def solicitudRepartidor(conn, request):
    # ? manejar documentos como base64
    try:
        print("Solicitud Repartidor")
        with conn.cursor() as cursor:
            sql = "SELECT * FROM repartidor;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for repartidor in result:
                """ blob_base64 = None
                with open(repartidor[9], 'rb') as f:
                    blob = f.read()
                    blob_base64 = base64.b64encode(blob).decode('utf-8') """
                cv = base64.b64encode(repartidor[9]).decode('utf-8') if repartidor[9] is not None else None
                rep = {
                    'id': repartidor[0],
                    'name': repartidor[1],
                    'lastname': repartidor[2],
                    'mail': repartidor[3],
                    'phone': repartidor[4],
                    'depto': repartidor[5],
                    'city': repartidor[6],
                    'license': repartidor[7],
                    'own_transport': repartidor[8],
                    'approved': repartidor[10],
                    'cv': cv
                }
                if cv is not None:
                    rep['cv'] = cv

                templist.append(rep)
            cursor.close()
            return jsonify({'res': templist, 'message': "Repartidores Cargados"})

    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})


def cambiarEstadoRepartidor(conn, request):
    data = request.get_json()
    id = data['id']
    state = data['state']
    # ! state 1 -> Aceptar state 2 -> Funar
    try:
        with conn.cursor() as cursor:
            # ? VALIDACION DE QUE NO TENGA PENDIENTES
            if (state == 2):
                sql = "SELECT * from pedido WHERE state=1 AND repartidor_id=%s"
                cursor.execute(sql, (id))
                result = cursor.fetchone()
                if result:
                    return jsonify({'res': False, 'message': 'El Repartidor Se Encuentra Ocupado Aun'})

            # ? ACTUALIZACION DE ESTADO
            sql = "UPDATE repartidor SET approved=%s WHERE id=%s;"
            cursor.execute(sql, (state, id))
            conn.commit()
            cursor.close()

            message = ""
            if (state == 1):
                message = "El Repartidor Ha Sido Aceptado"
            elif (state == 2):
                message = "El Repartidor Se Ha Dado De Baja Correctamente"

            return jsonify({'res': True, 'message': message})

    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})
