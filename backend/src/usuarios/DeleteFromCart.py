def delete_from_cart(conn, req):
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

    # Consultar la cantidad del producto en el carrito
    sql = '''
    SELECT cant
    FROM detail_pedido
    WHERE pedido_id = %s
    AND products_id = %s
    '''
    vals = (id_cart, id_product)
    cur.execute(sql, vals)
    res_sql = cur.fetchone()

    # Obtener la cantidad del producto
    cant = res_sql[0]

    if cant > 1:
        # Si la cantidad es mayor a 1, decrementar la cantidad
        # Si el producto ya esta en el carrito, incrementar la cantidad
        sql = '''
        UPDATE detail_pedido
        SET cant = cant - 1
        WHERE pedido_id = %s
        AND products_id = %s
        '''
        vals = (id_cart, id_product)
        cur.execute(sql, vals)
        conn.commit()
    else:
        # Si la cantidad es igual a 1, eliminar el producto del carrito
        sql = '''
        DELETE FROM detail_pedido
        WHERE pedido_id = %s
        AND products_id = %s
        '''
        vals = (id_cart, id_product)
        cur.execute(sql, vals)
        conn.commit()

    # Retornar respuesta
    return {
        "res": True
    }
