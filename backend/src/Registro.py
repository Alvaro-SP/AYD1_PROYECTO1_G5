from flask import jsonify
def registro(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    rol = data['rol'] # user=1, repartidor=2, empresa=3
    
    try:
        
        with conn.cursor() as cursor:
            if rol == 1: #todo user
                username=(data['username']).lower()
                password=(data['password']).lower()
                city=(data['city']).lower()
                depto=(data['depto']).lower()
                phone=(data['phone']).lower()
                sql = "INSERT INTO user (username, password, active, city, depto, phone) VALUES (%s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (username, password, "1", city, depto, phone))
                conn.commit()
                print('registro: '+str(rol))+" -- "+str(username)+" -- "+str(password)
                return jsonify({'res': True, 'type': 1})
            elif rol == 2: #todo repartidor
                name=(data['name']).lower()
                lastname=(data['lastname']).lower()
                mail=(data['mail']).lower()
                phone=(data['phone'])
                depto=(data['depto']).lower()
                city=(data['city']).lower()
                license=(data['license'])
                own_transport=(data['own_transport']).lower()
                cv=(data['cv'])
                password=(data['password']).lower()
                sql = "INSERT INTO user (name, lastname, mail, phone, depto, city, license, own_transport, cv, approved, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, lastname, mail, phone, depto, city, license, own_transport, cv, "0", password))
                conn.commit()
                print('registro: '+str(rol))+" -- "+str(mail)+" -- "+str(password)
                return jsonify({'res': True, 'type': 2})
            elif rol == 3: #todo empresa
                name=(data['username']).lower()
                description=(data['description']).lower()
                category=(data['category']).lower()
                mail=(data['mail']).lower()
                depto=(data['depto']).lower()
                zone=(data['zone'])
                municipio=(data['municipio']).lower()
                password=(data['password']).lower()
                sql = "INSERT INTO user (name, description, category, mail, depto, zone, municipio, approved, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, description, category, mail, depto, zone, municipio, "0", password))
                conn.commit()
                print('registro: '+str(rol))+" -- "+str(mail)+" -- "+str(password)
                return jsonify({'res': True, 'type': 3})
            cursor.close()
            conn.close()
            return jsonify({'res': False})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conn:
            conn.close()
        return jsonify({'res': False, 'type': 0})