from flask import jsonify


def aprobadosCONT(conn):
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
                    'repzonecont': usuario[2]
                }

                templist.append(enviar)

            cursor.close()
            return jsonify({'res': templist})
        
    except Exception as ex:
        print(ex)
        return jsonify({'res': False})


# ! AQUI EMPIEZAN LOS CAMBIOS
def getUsers(conn):
    try:
        with conn.cursor() as cursor:
            dataUser = {
                'tab1': [],
                'tab2': [],
                'tab3': [],
                'tab4': []
            }

            sql = "SELECT name, mail FROM user;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for usuario in result:
                user = {
                    'name': usuario[0],
                    'mail': usuario[1]
                }

                templist.append(user)

            dataUser['tab1'] = templist

            sql = "SELECT name, mail FROM user WHERE state = 1;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for usuario in result:
                user = {
                    'name': usuario[0],
                    'mail': usuario[1]
                }

                templist.append(user)

            dataUser['tab2'] = templist

            sql = "SELECT name, mail FROM user WHERE visitas <= 1 AND state = 1;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for usuario in result:
                user = {
                    'name': usuario[0],
                    'mail': usuario[1]
                }

                templist.append(user)

            dataUser['tab3'] = templist

            sql = "SELECT name, mail FROM user WHERE visitas > 1 AND state = 1;"
            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for usuario in result:
                user = {
                    'name': usuario[0],
                    'mail': usuario[1]
                }

                templist.append(user)

            dataUser['tab4'] = templist
            cursor.close()
            return jsonify({'res': dataUser, 'message': "Usuarios Cargados Correctamente"})
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})


def getRepartidores(conn):
    try:
        with conn.cursor() as cursor:
            dataRepartidor = {
                'tab1': [],
                'tab2': [],
                'tab3': []
            }

            sql = '''SELECT COUNT(p.repartidor_id) as entregas, r.name, r.lastname, r.mail, r.phone
                FROM pedido p
                INNER JOIN repartidor as r on r.id = p.repartidor_id
                GROUP BY p.repartidor_id;'''

            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for repartidor in result:
                rep = {
                    'dato': repartidor[0],
                    'name': repartidor[1],
                    'mail': repartidor[2]
                }

                templist.append(rep)

            dataRepartidor['tab1'] = templist

            sql = '''SELECT AVG(p.rate) as rate, r.name, r.mail
                FROM pedido p
                INNER JOIN repartidor as r on r.id = p.repartidor_id
                GROUP BY p.repartidor_id;'''

            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for repartidor in result:
                rep = {
                    'dato': str(repartidor[0]),
                    'name': repartidor[1],
                    'mail': repartidor[2]
                }

                templist.append(rep)

            dataRepartidor['tab2'] = templist

            sql = '''SELECT SUM(p.total_price) as ganancia, r.name, r.mail
                FROM pedido p
                INNER JOIN repartidor as r on r.id = p.repartidor_id
                GROUP BY p.repartidor_id'''

            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for repartidor in result:
                rep = {
                    'dato': str(repartidor[0]),
                    'name': repartidor[1],
                    'mail': repartidor[2]
                }

                templist.append(rep)

            dataRepartidor['tab3'] = templist
            cursor.close()
            return jsonify({'res': dataRepartidor, 'message': "Repartidores Cargados"})

    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})


def getEmpresas(conn):
    try:
        with conn.cursor() as cursor:
            dataEmpresa = {
                'tab1': [],
                'tab2': [],
                'tab3': []
            }

            sql = '''SELECT COUNT(p.`idEmpresa`) as entregas, e.name
                FROM pedido p
                INNER JOIN empresa as e on e.id = p.`idEmpresa`
                GROUP BY p.`idEmpresa`
                ORDER BY entregas DESC;'''

            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for negocio in result:
                empresa = {
                    'dato': negocio[0],
                    'name': negocio[1]
                }

                templist.append(empresa)

            dataEmpresa['tab1'] = templist

            sql = '''SELECT SUM(p.total_price) as ventas, e.name
                FROM pedido p
                INNER JOIN empresa as e on e.id = p.`idEmpresa`
                GROUP BY p.`idEmpresa`;'''

            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for negocio in result:
                empresa = {
                    'dato': str(negocio[0]),
                    'name': negocio[1]
                }

                templist.append(empresa)

            dataEmpresa['tab2'] = templist

            sql = '''SELECT SUM(d.cant) as cantidad, pr.name
                FROM detail_pedido as d
                INNER JOIN products as pr ON pr.id = d.products_id
                GROUP BY d.products_id
                ORDER BY cantidad DESC;'''

            cursor.execute(sql)
            result = cursor.fetchall()
            templist = []
            for negocio in result:
                empresa = {
                    'dato': str(negocio[0]),
                    'name': negocio[1]
                }

                templist.append(empresa)

            dataEmpresa['tab3'] = templist
            cursor.close()
            return jsonify({'res': dataEmpresa, 'message': 'Empresas Cargadas'})
    except Exception as ex:
        print(ex)
        return jsonify({'res': False, 'message': str(ex)})