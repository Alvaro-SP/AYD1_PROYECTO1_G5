from app import app
import json

def test_login_admin():
    with app.test_client() as client:
        response = client.post('/login', json={
            'rol': 0,
            'email': 'admin@gmail.com',
            'pass': 'admin'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == True
        assert data['message'] == 'Bienvenido senor Admin, quisiera desafiarlo.'


def test_login_user():
    with app.test_client() as client:
        response = client.post('/login', json={
            'rol': 1,
            'email': 'user@gmail.com',
            'pass': 'password'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == False
        assert data['user']['name'] == False
        assert data['message'] == False


def test_login_repartidor():
    with app.test_client() as client:
        response = client.post('/login', json={
            'rol': 2,
            'email': 'repartidor@gmail.com',
            'pass': 'password'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == False
        assert data['user']['name'] == 'Juan'
        assert data['user']['type'] == 2
        assert data['message'] == 'Que tal joven repartidor se ha logueado exitosamente'


def test_login_empresa():
    with app.test_client() as client:
        response = client.post('/login', json={
            'rol': 3,
            'email': 'empresa@gmail.com',
            'pass': 'password'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == False
        assert data['user']['name'] == 'Acme Corp'
        assert data['user']['type'] == 3
        assert data['message'] == 'Que hay de nuevo Empresa, se ha logueado exitosamente'
