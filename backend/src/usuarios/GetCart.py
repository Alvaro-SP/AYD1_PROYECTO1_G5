def get_cart(conn, req):
    # Parsear data
    data = req.get_json()

    # Capturar datos
    id_usr = data['id_usr']

    # Crear cursor
    cur = conn.cursor()

    # Consultar si el usuario tiene un carrito activo
    sql = '''
    SELECT id
    FROM pedido
    WHERE user_id = %s
    AND state = 3
    '''
    vals = (id_usr,)
    cur.execute(sql, vals)
    res_sql = cur.fetchone()

    if res_sql:
        # Si existe un carrito activo, obtener el id
        id_cart = res_sql[0]
    else:
        # Si no existe un carrito activo, crear uno
        sql = '''
        INSERT INTO pedido (
            user_id,
            state
        ) VALUES (
            %s,
            3
        )
        '''
        vals = (id_usr,)
        cur.execute(sql, vals)
        conn.commit()

        # Obtener el id del carrito recien creado
        id_cart = cur.lastrowid

    # Obtener los productos del carrito
    sql = '''
    SELECT pr.id, pr.name, dp.cant, (dp.cant * pr.price) AS total
    FROM pedido p
    INNER JOIN detail_pedido dp
    ON p.id = dp.pedido_id
    INNER JOIN products pr
    ON dp.products_id = pr.id
    WHERE p.id = %s
    '''
    vals = (id_cart,)
    cur.execute(sql, vals)
    res_sql = cur.fetchall()
    cart = []
    for row in res_sql:
        cart.append({
            'id': row[0],
            'name': row[1],
            'cant': row[2],
            'total': row[3]
        })

    # Retornar respuesta
    return {
        "cart": cart
    }
