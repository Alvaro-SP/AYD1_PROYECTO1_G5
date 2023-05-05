from app import app

def test_registro_user():
    with app.test_client() as client:
        # ! test for registering a user
        data = {'name': 'John Doe', 'password': 'password123', 'correo': 'john.doe@example.com', 'rol': 1}
        response = client.post('/register', data=data)
        assert response.status_code == 200

def test_registro_repartidor():
    with app.test_client() as client:
        # ! test for registering a delivery person
        data = {'name': 'John', 'lastname': 'Doe', 'mail': 'john.doe@example.com', 'password': 'password123', 'phone': '123456789', 'depto': 'Qhiche', 'city': 'York City', 'license': '12345678', 'own_transport': 'true', 'approved': 1, 'rol': 2}
        response = client.post('/register', data=data, content_type='multipart/form-data', buffered=True)
        assert response.status_code == 200

# def test_registro_empresa():
#     with app.test_client() as client:
#         # ! test for registering a company
#         data = {'name': 'Del Puente', 'description': 'Some description', 'category': 1, 'mail': 'company@example.com', 'depto': 'Some Department', 'municipio': 'Some Municipality', 'password': 'password123'}
#         response = client.post('/register', data=data, content_type='multipart/form-data', buffered=True)
#         assert response.status_code == 200