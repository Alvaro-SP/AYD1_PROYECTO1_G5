import json
from app import app

def test_pedidosdeusersempresa():
    with app.test_client() as client:
        # Caso de prueba 1: empresa sin pedidos
        data = {"id": 1}
        response = client.post('/pedidos-de-user-empresa', json=data)
        assert response.status_code == 200
        excepted = {'message': 'Pedidos', 'res': []}
        assert json.loads(response.data) == excepted


        

        
