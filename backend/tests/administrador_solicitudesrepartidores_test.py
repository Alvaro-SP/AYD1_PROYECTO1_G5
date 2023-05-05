import json
from app import app

def test_cambiar_estado_repartidor():
    with app.test_client() as client:
        data = {"id": 1002,"state":1} #aqui se debe crear un repartidor con id y state 0
        response = client.post('/confirmar-repartidor', json=data)
        assert response.status_code == 200
        expected = {'res': True, 'message': 'El Repartidor Ha Sido Aceptado'}
        assert json.loads(response.data) == expected