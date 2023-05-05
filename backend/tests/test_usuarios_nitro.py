from app import app
import json

def test_get_categories():
    with app.test_client() as client:
        response = client.get('/getcategories')
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] != False

def test_empresacategory():
    with app.test_client() as client:
        response = client.get('/empresas-category')
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert len(response.json['res']) > 0
        assert all(key in response.json['res'][0] for key in ['id', 'name', 'description', 'category', 'mail', 'depto', 'municipio', 'imagen'])

def test_products_empresa():
    with app.test_client() as client:
        response = client.post('/products-empresa', json={'id': 1})
        data = response.get_json()

        assert response.status_code == 200
        assert isinstance(data['res'], list)
        assert all(key in data['res'][0] for key in ['id', 'name', 'precio', 'imagen', 'categoria', 'categoryProduct_id', 'disponibilidad', 'description'])

def test_products_empresa():
    with app.test_client() as client:
        response = client.post('/get-cart', json={'id_usr': 1})
        data = response.get_json()

def test_realizar_pedido_usuario():
    with app.test_client() as client:
        # Data de prueba
        data = {
            "user_id": 1,
            "total_price": 100,
            "address": "Calle falsa 123",
            "payment_method": "Efectivo",
            "id_empresa": 1,
            "products": [
                {
                    "product_id": 1,
                    "quantity": 2
                },
                {
                    "product_id": 2,
                    "quantity": 1
                }
            ]
        }

        response = client.post('/realizar-pedido-user', json=data)

        assert response.status_code == 200

        response_data = json.loads(response.data)

        assert response_data.get("res") == True
