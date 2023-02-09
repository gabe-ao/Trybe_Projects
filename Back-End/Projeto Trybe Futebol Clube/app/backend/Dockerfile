FROM node:16.14-alpine

EXPOSE 3001

# O WORKDIR define qual o diretorio de referencia para os comandos CMD, RUN, ENTRYPOINT, COPY e ADD posteriores.
WORKDIR /app-backend

# Estes COPY, RUN e ENTRYPOINT estão utilizando enderecos relativos como destinos, o quais sao identificados pela ausencia de '/' iniciais.
# Este script foi feito assim com o intuito de praticar o uso de enderecos absolutos e relativos
# Enderecos absolutos comecam com '/' que simboliza a raiz do systemfile do container. Enquanto os relativos podem comecar com '.', './' ou o nome do arquivo presente no diretorio setado como referencia.
# Ambas as formas de enderecamento sao validas.
COPY . .

RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]
