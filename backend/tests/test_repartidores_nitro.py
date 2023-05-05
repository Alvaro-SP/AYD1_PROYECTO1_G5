from app import app
import json

def test_solicambiozona():
    with app.test_client() as client:
        # Crea un diccionario con los datos de la solicitud
        data = {
            'id': 1,
            'depto': 'Antioquia',
            'city': 'Medellín'
        }
        # Envía una solicitud POST a la ruta "/soli-change-zone" con los datos
        response = client.post('/soli-change-zone', data=json.dumps(data), content_type='application/json')
        # Verifica que la respuesta sea exitosa (código 200)
        assert response.status_code == 200
        # Verifica que el mensaje de respuesta sea el esperado
        assert response.json['message'] == 'Solicitud realizada'



def test_prepararpedido():
    with app.test_client() as client:
        # Hacer una solicitud POST al endpoint '/preparar-pedido-empresa' con los datos de ejemplo
        response = client.post('/preparar-pedido-empresa', 
                            data=json.dumps({'id': 1}), 
                            content_type='application/json')
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        data = json.loads(response.data)
        assert data['res'] == True
        assert data['message'] == 'Pedido preparado'

def test_comisionreparti():
    with app.test_client() as client:
        data = {'id': 1}
        response = client.post('/comisiones-repartidor', json=data)
        assert response.status_code == 200
        assert response.json['res'] == False

def test_historialpedrep():
    with app.test_client() as client:
        # Simulamos una solicitud POST con un JSON que contiene el id del repartidor
        data = {'id': 1}
        response = client.post('/historialpedidos-repartidor', json=data)
        # Comprobamos que la respuesta tiene el estado 200
        assert response.status_code == 200
        # Comprobamos que la respuesta tiene la estructura correcta
        expected_keys = {'res', 'message'}
        assert set(response.json.keys()) == expected_keys
        # Comprobamos que la comisión total es calculada correctamente
        # comision_total = response.json['comisiontotal']
        # expected_comision_total = 0
        # for pedido in response.json['res']:
        #     expected_comision_total += pedido['total_price'] * 0.05
        # assert comision_total == expected_comision_total

def test_entregarpedido():
    with app.test_client() as client:
        data = {'id': 1}
        response = client.post('/entregarpedido-repartidor', json=data)

        # assert that the response is a success (200) and the message is correct
        assert response.status_code == 200
        # assert response.json['res'] == True
        # assert response.json['message'] == 'Pedido entregado correctamente'

def test_cambiozona():
    with app.test_client() as client:
        # *Create a new repartidor
        data = {
            'nombre': 'Test Repartidor',
            'email': 'testrepartidor@test.com',
            'password': 'test1234',
            'deptotemp': 'La Paz',
            'citytemp': 'El Alto'
        }
        # client.post('/crearrepartidor', json=data)

        # Log in as the repartidor
        data = {
            'email': 'testrepartidor@test.com',
            'password': 'test1234',
            'tipo': 2
        }
        # response = client.post('/login', json=data)
        # repartidor_id = response.get_json()['id']

        # Change the repartidor's zone
        data = {
            'id': 1
        }
        response = client.post('/change-zone', json=data)
        # assert response.status_code == 200
        # assert response.get_json()['res'] == True
        # assert response.get_json()['message'] == "Cambio de zona realizado"
