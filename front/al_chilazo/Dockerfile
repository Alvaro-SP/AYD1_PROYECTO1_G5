# Configura la imagen base
FROM node:16-alpine 

# Configura el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos necesarios a la imagen
COPY . .

# Instalar dependencias
RUN npm install

# Construir app
RUN npm run build

# Instalar modulo de servidor
RUN npm install -g serve

# Levantar contenedor y servidor
CMD ["serve", "-s", "dist"]

#! docker build -t alvarosp24/frontend_analisis1 .
#! docker run -d -p 3000:3000 alvarosp24/frontend_analisis1