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
            'email': 'TESTUNITARIOS2@gmail.com',
            'pass': '12345678'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == True
        assert data['user']['name'] == 'TESTUNITARIOS'
        assert data['message'] == 'Hola usuario usted se ha logueado exitosamente'


def test_login_repartidor():
    with app.test_client() as client:
        response = client.post('/login', json={
            'rol': 2,
            'email': 'jorge@gmail',
            'pass': '12345678'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == True
        assert data['user']['name'] == 'jorge'
        assert data['message'] == 'Que tal joven repartidor se ha logueado exitosamente'


def test_login_empresa():
    with app.test_client() as client:
        response = client.post('/login', json={
            'rol': 3,
            'email': 'TESTUNITARIOS@gmail.com',
            'pass': '12345678'
        })
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['res'] == True
        if data['user']:
            assert data['user']['name'] == 'TESTUNITARIOS'
            assert data['user']['type'] == 3
            assert data['message'] == 'Que hay de nuevo Empresa, se ha logueado exitosamente'
