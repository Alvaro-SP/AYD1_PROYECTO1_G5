
# from app import app
# import json
# def test_empresas_category():
#     with app.test_client() as client:
#         response = client.get('/empresas-category')
#         data = json.loads(response.data)
#         assert response.status_code == 200
#         assert isinstance(data['res'], list)

# def test_empresacategorias():
#     with app.test_client() as client:
#         response = client.post('/products-empresa', json={
#             'id': 1
#         })
#         data = json.loads(response.data)
#         assert response.status_code == 200
#         assert isinstance(data['res'], list)
#         assert all(isinstance(item, dict) for item in data['res'])
#         assert all('id' in item for item in data['res'])
#         assert all('name' in item for item in data['res'])
#         assert all('precio' in item for item in data['res'])
#         assert all('imagen' in item for item in data['res'])
#         assert all('categoria' in item for item in data['res'])
#         assert all('categoryProduct_id' in item for item in data['res'])
#         assert all('disponibilidad' in item for item in data['res'])
#         assert all('description' in item for item in data['res'])
