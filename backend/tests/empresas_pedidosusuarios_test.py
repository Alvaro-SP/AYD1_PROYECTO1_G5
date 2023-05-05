import json
from app import app

def test_pedidosdeusersempresa():
    with app.test_client() as client:
        # Caso de prueba 1: empresa sin pedidos
        data = {"id": 1}
        response = client.post('/pedidos-de-user-empresa', json=data)
        assert response.status_code == 200
        assert response.json['res'] != None
    assert response.json['message'] == 'Pedidos'


def test_confirmarpedido():
    with app.test_client() as client:
        # Preparamos el request con el id del pedido a confirmar
        request_data = {'id': 1}
        response = client.post('/confirmar-pedido-empresa', json=request_data)

        # Verificamos que la respuesta sea exitosa y tenga el mensaje esperado
        assert response.status_code == 200
        expected = {'res': True, 'message': 'Pedido confirmado'}
        assert json.loads(response.data) == expected

import json

#def test_prepararpedido(client, conn):
#    with app.test_client() as client:
#        request_data = {'id': 2}
#        response = client.post('/preparar-pedido-empresa', json=request_data)
#        # Verificar que la respuesta es correcta
#        assert response.status_code == 200
#        assert json.loads(response.data) == {'res': True, 'message': 'Pedido preparado'}




        

        
