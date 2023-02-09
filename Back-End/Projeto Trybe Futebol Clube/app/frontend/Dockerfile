FROM node:16.14-alpine

EXPOSE 3000

# O COPY está utilizando endereco absoluto como destinos, o qual e identificado pela '/' inicial.
# O WORKDIR e setado depois para que RUN e ENTRYPOINT seja executados na pasta correta.
# Este script foi feito assim com o intuito de praticar o uso de enderecos absolutos e relativos
# Endereços relativos nao comecam com barra e serao relativos ao WORDIR setado. Ambas as formas sao validas.
# Para utilizar o WORDIR diretamente, usa-se simplesmente '.' ou './'. 
COPY . /app-frontend/

WORKDIR /app-frontend

RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]
