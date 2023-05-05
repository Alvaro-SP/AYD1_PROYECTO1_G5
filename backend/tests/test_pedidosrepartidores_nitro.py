from app import app
import json

def test_pedidosporentregarepartidor():
    with app.test_client() as client:
        response = client.post('/pedidosaentregar-repartidor', json={'id': 1})
        # Verificar si la respuesta HTTP es 200 OK
        assert response.status_code == 200
        assert isinstance(response.json['res'], list)
        for pedido in response.json['res']:
            assert 'id' in pedido
            assert 'state' in pedido
            assert 'date' in pedido
            assert 'total_price' in pedido
            assert 'address' in pedido
            assert 'payment_method' in pedido
            assert 'rate' in pedido
        # Verificar si la respuesta contiene un mensaje de éxito
        assert response.json['message'] == 'pedidos por entregar'


def test_perfilrepartidor():
    with app.test_client() as client:
        response = client.post('/perfil-repartidor', json={'id': 1})
        assert response.status_code == 200
        assert response.json['message'] == 'Datos personales de repartidor'
        assert 'id' in response.json['res']
        assert 'name' in response.json['res']
        assert 'lastname' in response.json['res']
        assert 'mail' in response.json['res']
        assert 'phone' in response.json['res']
        assert 'depto' in response.json['res']
        assert 'city' in response.json['res']
        assert 'license' in response.json['res']
        assert 'own_transport' in response.json['res']
        assert 'rating' in response.json['res']

import json

def test_selectpedido():
    with app.test_client() as client:
        # * datos de pedido y repartidor
        response = client.post('/selectpedido-repartidor', json={
            'idPedido': 1,
            'idRepartidor': 1
        })
        assert response.status_code == 200

        data = json.loads(response.data)
        assert 'res' in data
        assert 'message' in data

        assert data['res'] in [True, False]
