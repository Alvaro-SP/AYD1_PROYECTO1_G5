import json
from app import app

def test_remover_usuario():
    with app.test_client() as client:
        data = {"id": 1003}
        response = client.post('/remover-usuario', json=data)
        assert response.status_code == 200
        expected = {'res': True, 'message': 'El Usuario Se Ha Dado De Baja'}
        assert json.loads(response.data) == expected