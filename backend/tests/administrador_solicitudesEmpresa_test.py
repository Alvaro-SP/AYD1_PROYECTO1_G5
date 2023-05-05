import json
from app import app


def test_cambiar_estado_empresa():
    with app.test_client() as client:
        data = {"id": 1,"state":1}
        response = client.post('/confirmar-empresa', json=data)
        assert response.status_code == 200
        expected = {'res': True, 'message': 'La Empresa Ha Sido Aceptada'}
        assert json.loads(response.data) == expected