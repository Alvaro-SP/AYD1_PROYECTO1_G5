import json
from app import app

def test_addproduct():
    request_data = {
        "id": 3, #este id es el de la empresa
        "name": "Cerveza",#validar que no exista el producto
        "price": 9.99,
        "imagen": "pizza.jpg",
        "category": "Food",
        "categoryProduct_id": 1,
        "disponibilidad": True,
        "description": "Delicious pizza"
    }
    with app.test_client() as client:
        response = client.post('/addproduct', json=request_data)
        assert response.status_code == 200
        expected = {"res": False, "reason": "Ya existe un producto con ese nombre"}
        assert json.loads(response.data) == expected

#validar que no exista el producto
def test_addproduct2():
    request_data = {
        "id": 1, #este id es el de la empresa
        "name": "Pizza",#validar que no exista el producto
        "price": 9.99,
        "imagen": "pizza.jpg",
        "category": "Food",
        "categoryProduct_id": 1,
        "disponibilidad": True,
        "description": "Delicious pizza"
    }
    with app.test_client() as client:
        response = client.post('/addproduct', json=request_data)
        assert response.status_code == 200
        expected = {"res": False, "reason": "Ya existe un producto con ese nombre"}
        assert json.loads(response.data) == expected


def test_updateproduct():
    request_data = {
        "id": 1, #este id es el del producto
        "name": "Pizza",
        "price": 9.99,
        "imagen": "pizza.jpg",
        "category": "Comida",
        "categoryProduct_id": 1,
        "disponibilidad": True,
        "description": "Deliciosa Pizza"
    }
    with app.test_client() as client:
        response = client.post('/updateproduct', json=request_data)
        assert response.status_code == 200
        expected = {"res": True, "type": 1}
        assert json.loads(response.data) == expected

