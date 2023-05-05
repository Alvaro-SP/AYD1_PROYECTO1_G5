from app import app
import json

def test_historial_pedidos_usuario():
    with app.test_client() as client:
        # Enviar una solicitud de prueba al endpoint con un id de usuario existente
        response = client.post('/historial-pedidos-user', json={
            'id': 1
        })
        # Asegurarse de que la respuesta sea exitosa
        assert response.status_code == 200
        # Asegurarse de que la respuesta contenga la información esperada
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'res' in data
        assert 'message' in data
        assert isinstance(data['res'], list)
        for pedido in data['res']:
            assert isinstance(pedido, dict)
            assert 'id' in pedido
            assert 'state' in pedido
            assert 'date' in pedido
            assert 'total_price' in pedido
            assert 'address' in pedido
            assert 'payment_method' in pedido
            assert 'rate' in pedido
            assert 'name_repartidor' in pedido
            assert 'name_empresa' in pedido
