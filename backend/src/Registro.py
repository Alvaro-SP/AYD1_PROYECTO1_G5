from flask import jsonify
import jwt
def registro(conn, request):
    # ! -------------- taking the data ----------------
    data = request.form
    rol = int(request.form.get('rol')) # user=1, repartidor=2, empresa=3
    print(rol)
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
                sql = "INSERT INTO user (name, password, mail, state) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (name, password, correo, 1))
                conn.commit()
                print('registro: ',str(rol),' -- ',str(name),' -- ',str(password))
                return jsonify({'res': True, 'type': 1, 'message': 'El usuario se ha registrado exitosamente'})
            elif rol == 2: #todo repartidor
                # name=(data['name']).lower()
                # lastname=(data['lastname']).lower()
                # mail=(data['mail']).lower()
                # phone=(data['phone'])
                # depto=(data['depto']).lower()
                # city=(data['city']).lower()
                # license=(data['license'])
                # own_transport=(data['own_transport']).lower()
                # cv = request.files['cv']
                # password=(data['password']).lower()
                name = request.form.get('name')
                lastname = request.form.get('lastname')
                mail = request.form.get('mail')
                password = request.form.get('password')
                phone = request.form.get('phone')
                depto = request.form.get('depto')
                city = request.form.get('city')
                license = request.form.get('license')
                own_transport = request.form.get('own_transport')
                # Get the file from the request
                cv = request.files['cv'].read()
                sql = "SELECT * FROM repartidor WHERE mail = %s"
                cursor.execute(sql, (mail,))
                existing_user = cursor.fetchall()
                if existing_user:
                    print("Delivery with mail {} already exists".format(mail))
                    return jsonify({'res': False, 'type': 2,'message': 'El repartidor ya existe'})
                sql = "INSERT INTO repartidor (name, lastname, mail, phone, depto, city, license, own_transport, cv, approved, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, lastname, mail, phone, depto, city, license, own_transport, cv, "0", password))
                conn.commit()
                print('registro: ',str(rol)," -- ",str(mail)," -- ",str(password))
                return jsonify({'res': True, 'message': 'El repartidor se ha registrado exitosamente'})
            elif rol == 3: #todo empresa
                name = request.form.get('name')
                description = request.form.get('description')
                category = request.form.get('category')
                mail = request.form.get('mail')
                depto = request.form.get('depto')
                municipio = request.form.get('municipio')
                password = request.form.get('password')
                # Leer el archivo en forma de bytes
                docAuth = request.files['docAuth'].read()
                docReg = request.files['docReg'].read()
                docRegSan = request.files['docRegSan'].read()
                # Check if the user already exists
                sql = "SELECT * FROM empresa WHERE mail = %s"
                cursor.execute(sql, (mail,))
                existing_user = cursor.fetchall()
                if existing_user:
                    print("Empresa with mail {} already exists".format(mail))
                    return jsonify({'res': False, 'type':3, 'message': 'La empresa ya existe'})
                sql = "INSERT INTO empresa (name, description, category, mail, depto,  municipio, approved, password, docauth, docreg, docregsan) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, description, category, mail, depto,  municipio, "0", password,docAuth, docReg, docRegSan))
                conn.commit()
                # Obtener el ID de la empresa recién insertada
                # cursor.execute("SELECT LAST_INSERT_ID()")
                # result = cursor.fetchone()
                # cursor.fetchall()
                # empresa_id = result[0]
                # Insertar los documentos en la tabla documents

                print('registro: ',str(rol)," -- ",str(mail)," -- ",str(password))
                return jsonify({'res': True, 'type': 3, 'message': 'La empresa se ha registrado exitosamente'})
            cursor.close()
            # conn.close()
            return jsonify({'res': False, 'message': 'Error en el registro revisar si los datos estan correctos'})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print("error:", ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'type': 0, 'message': str(ex)})