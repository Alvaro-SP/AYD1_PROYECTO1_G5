import json
from app import app


def test_solicitud_ubicacion_rep():
    with app.test_client() as client:
        response = client.get('/solicitudes-ubicacion-rep')
        assert response.status_code == 200
        expected = {'res': [{'id': 1000, 'name': 'test', 'lastname': 'unitario', 'mail': 'test@gmail.com', 'deptoActual': 'Guatemala', 'cityActual': 'Ciudad de Guatemala', 'deptoNew': 'El Progreso', 'cityNew': 'Camotan'}], 'message': 'Solicitudes Cargadas'}
        assert json.loads(response.data) == expected

def test_confirmar_ubicacion_nueva():
    with app.test_client() as client:
        data = {"id": 1000, "state": 0}
        response = client.post('/confirmar-ub-nueva-rep', json=data)
        assert response.status_code == 200
        expected = {'res': True, 'message': 'La Solicitud Se Ha Actualizado Correctamente'}
        assert json.loads(response.data) == expected

        data = {"id": 1000, "state": 1}
        response = client.post('/confirmar-ub-nueva-rep', json=data)
        assert response.status_code == 200
        expected = {'res': True, 'message': 'La Solicitud Se Ha Rechazado Correctamente'}
        assert json.loads(response.data) == expected
