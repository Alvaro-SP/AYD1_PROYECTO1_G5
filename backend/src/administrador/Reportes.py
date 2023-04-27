from flask import jsonify


def aprobadosCONT(conn, request):
    try:
        with conn.cursor() as cursor:
            sql = '''SELECT (
                SELECT coUnt(approved) FROM repartidor WHERE approved = 0
                ) as repcont, 
                (
                SELECT coUnt(approved) FROM empresa WHERE approved = 0
                ) as empresacont,
                (
                SELECT coUnt(solizone) FROM repartidor WHERE solizone = 1
                ) as repzonecont;'''
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for usuario in result:
                enviar = {
                    'repcont': usuario[0],
                    'empresacont': usuario[1],
                    'repzonecont': usuario[3]
                }

                templist.append(enviar)

            cursor.close()
            return jsonify({'res': templist})
        
    except Exception as ex:
        print(ex)
        return jsonify({'res': False})