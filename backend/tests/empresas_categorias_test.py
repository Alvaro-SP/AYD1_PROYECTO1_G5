import json
from app import app

def test_getcategoriaproducto():
    with app.test_client() as client:
        data = {"id": 1}
        response = client.post('/categoriasproducto-empresa', json=data)

        assert response.status_code == 200
        expected = {'res': [{'id': 1, 'name': 'carnes'}, {'id': 2, 'name': 'Burgers'}, {'id': 3, 'name': 'Pizzas'}, {'id': 4, 'name': 'Sodas'}, {'id': 5, 'name': ''},{'id': 9, 'name': 'Nueva Categoria'},{'id':11, 'name': 'Categoria de prueba'}]}
        assert json.loads(response.data) == expected

        # Caso 2: obtener las categorías de un producto de una empresa que no tiene categorías
        data = {"id": 11}
        response = client.post('/categoriasproducto-empresa', json=data)
        assert response.status_code == 200
        expected = {'res': []}
        assert json.loads(response.data) == expected


def test_addcategoriaproducto_categoria_existente():
    with app.test_client() as client:
        # Datos para agregar una nueva categoría de producto
        data = {"id": 1000, "name": "Categoria Prueba"}

        # Agregar la categoría
        response = client.post('/addcategoriaproducto', json=data)
        assert response.status_code == 200
        # expected = {"res": False, "message": "Ya existe una categoria con ese nombre"}
        # assert json.loads(response.data) == expected
