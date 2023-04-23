from flask import jsonify
from datetime import datetime
import jwt
def realizarpedidousuario(conn, request):
    # ! -------------- taking the data ----------------
    #data = request.form
    data = request.get_json()
    user_id=(data['user_id'])
    total_price=(data['total_price'])
    address=(data['address'])
    payment_method=(data['payment_method'])
    id_empresa=(data['id_empresa'])
    products=(data['products'])
    pedido = []

    print(user_id, "user_id")
    print(total_price, "total_price")
    print(address, "address")
    print(payment_method, "payment_method")
    print(id_empresa, "id_empresa")
    print(products, "products")
    
    # {
    # lista de productos con su cantidad
    # }
    try:
        with conn.cursor() as cursor:
            #sql = '''INSERT INTO pedido (state, date, total_price, user_id, address, payment_method, empresa ) 
            sql = '''INSERT INTO pedido (state, date, total_price, user_id, address, payment_method, idEmpresa ) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)'''
            now = datetime.now()
            formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
            print(formatted_date, "FECHA")
            cursor.execute(sql, ("4", formatted_date, total_price, user_id, address, payment_method, id_empresa))
            conn.commit()

            # Obtener el último id insertado
            last_id = cursor.lastrowid
            # insert all the products
            #for item in data.getlist('products'):
            for item in data['products']:
                pedido.append({
                    'cant': item['quantity'],
                    'pedido_id': last_id,
                    'products_id': item['product_id']
                })
            # * se insertan todos los productos
            for item in pedido:
                #cursor.execute("INSERT INTO detail_user (cant, pedido_id, products_id) VALUES (%s, %s, %s)", (item['cant'], item['pedido_id'], item['products_id']))
                cursor.execute("INSERT INTO detail_pedido (cant, pedido_id, products_id) VALUES (%s, %s, %s)", (item['cant'], item['pedido_id'], item['products_id']))
            conn.commit()
            print('insertando pedido: ',str(last_id),' -- ')
            return jsonify({'res': True, 'type': 1, 'message': 'El usuario se ha registrado exitosamente'})
    except Exception as ex:
        # Siempre cerrar la conexión a la base de datos
        print(ex)
        # if conn:
        #     conn.close()
        return jsonify({'res': False, 'message': str(ex)})
