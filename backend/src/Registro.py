from flask import jsonify
import jwt
def registro(conn, request):
    # ! -------------- taking the data ----------------
    data = request.get_json()
    rol = int(data['rol']) # user=1, repartidor=2, empresa=3
    try:
        with conn.cursor() as cursor:
            if rol == 1: #todo user
                name=(data['name']).lower()
                password=(data['password']).lower()
                correo=(data['correo']).lower()
                # Check if the user already exists
                sql = "SELECT * FROM user WHERE mail = %s"
                cursor.execute(sql, (correo,))
                existing_user = cursor.fetchall()
                if existing_user:
                    print("User with username {} already exists".format(mail))
                    return jsonify({'res': False, 'message': 'El usuario ya existe'})
                sql = "INSERT INTO user (name, password, mail) VALUES (%s, %s, %s)"
                cursor.execute(sql, (name, password, correo))
                conn.commit()
                print('registro: ',str(rol),' -- ',str(name),' -- ',str(password))
                return jsonify({'res': True, 'type': 1, 'message': 'El usuario se ha registrado exitosamente'})
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
                # Check if the user already exists
                sql = "SELECT * FROM user WHERE mail = %s"
                cursor.execute(sql, (mail,))
                existing_user = cursor.fetchall()
                if existing_user:
                    print("Delivery with mail {} already exists".format(mail))
                    return jsonify({'res': False, 'type': 2,'message': 'El repartidor ya existe'})
                sql = "INSERT INTO user (name, lastname, mail, phone, depto, city, license, own_transport, cv, approved, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, lastname, mail, phone, depto, city, license, own_transport, cv, "0", password))
                conn.commit()
                print('registro: ',str(rol)," -- ",str(mail)," -- ",str(password))
                return jsonify({'res': True, 'message': 'El repartidor se ha registrado exitosamente'})
            elif rol == 3: #todo empresa
                name=(data['username']).lower()
                description=(data['description']).lower()
                category=(data['category']).lower()
                mail=(data['mail']).lower()
                depto=(data['depto']).lower()
                zone=(data['zone'])
                municipio=(data['municipio']).lower()
                password=(data['password']).lower()
                # Check if the user already exists
                sql = "SELECT * FROM empresa WHERE mail = %s"
                cursor.execute(sql, (mail,))
                existing_user = cursor.fetchall()
                if existing_user:
                    print("Empresa with mail {} already exists".format(mail))
                    return jsonify({'res': False, 'type':3, 'message': 'La empresa ya existe'})
                sql = "INSERT INTO user (name, description, category, mail, depto, zone, municipio, approved, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, description, category, mail, depto, zone, municipio, "0", password))
                conn.commit()
                print('registro: ',str(rol)," -- ",str(mail)," -- ",str(password))
                return jsonify({'res': True, 'type': 3, 'message': 'La empresa se ha registrado exitosamente'})
            cursor.close()
            # conn.close()
            return jsonify({'res': False, 'message': 'Error en el registro revisar si los datos estan correctos'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        if conn:
            conn.close()
        return jsonify({'res': False, 'type': 0, 'message': str(ex)})