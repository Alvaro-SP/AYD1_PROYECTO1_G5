```bash


    # ======== PARA CORRER EL LOS TEST =========
    #         ====FRONT====
pytest --cov test_login_nitro.py
pytest --cov=test_login_nitro.py test_login_nitro.py
pytest --cov=test_empresacategoria_nitro.py test_empresacategoria_nitro.py -vv
pytest --cov=test_usuarios_nitro.py test_usuarios_nitro.py -vv
pytest --cov=test_historial_nitro.py test_historial_nitro.py -vv
pytest --cov test_login_nitro.py


# Para medir las pruebas unitarias se posiciona en backend, luego se ejecuta:
pytest --cov=tests/ -vv
pytest --cov=tests/

	# ======== PARA CONSTRUIR LAS IMAGENES =========
	# 		====FRONT====
cd /home/droid/Documents/AYD1_PROYECTO1_G5/front/al_chilazo
docker build -t alvarosp24/frontend_analisis1:latest . --no-cache --force-rm
docker run -d -p 3000:3000 alvarosp24/frontend_analisis1:latest

			# ====BACK====
cd /home/droid/Documents/AYD1_PROYECTO1_G5/backend
docker build -t alvarosp24/back_analisis:latest . --no-cache --force-rm
docker run -d -p 5000:5000 alvarosp24/back_analisis:latest


```
