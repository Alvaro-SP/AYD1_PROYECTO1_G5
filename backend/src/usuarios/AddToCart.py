def add_to_cart(conn, req):
    # Parsear data
    data = req.get_json()

    # Capturar datos
    id_usr = data['id_usr']
    id_product = data['id_product']

    # Crear cursor
    cur = conn.cursor()

    # Consultar el carrito activo del usuario
    sql = '''
    SELECT id
    FROM pedido
    WHERE user_id = %s
    AND state = 3
    '''
    vals = (id_usr,)
    cur.execute(sql, vals)
    res_sql = cur.fetchone()
    
    # Obtener el id del carrito
    id_cart = res_sql[0]

    # Consultar si el producto ya esta incluido en el carrito
    sql = '''
    SELECT *
    FROM detail_pedido
    WHERE pedido_id = %s
    AND products_id = %s
    '''
    vals = (id_cart, id_product)
    cur.execute(sql, vals)
    res_sql = cur.fetchone()

    if res_sql:
        # Si el producto ya esta en el carrito, incrementar la cantidad
        sql = '''
        UPDATE detail_pedido
        SET cant = cant + 1
        WHERE pedido_id = %s
        AND products_id = %s
        '''
        vals = (id_cart, id_product)
        cur.execute(sql, vals)
        conn.commit()
    else:
        # Si el producto no esta en el carrito, agregarlo
        sql = '''
        INSERT INTO detail_pedido (
            pedido_id,
            products_id,
            cant
        ) VALUES (%s, %s, %s)
        '''
        vals = (id_cart, id_product, 1)
        cur.execute(sql, vals)
        conn.commit()

    # Retornar respuesta
    return {
        "res": True
    }
