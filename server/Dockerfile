FROM node:20-alpine3.17 as deps_installer

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

FROM node:20-alpine3.17 as deployment

WORKDIR /usr/app 

COPY --chown=node:node --from=deps_installer /usr/app/node_modules ./node_modules

COPY --chown=node:node ./src ./src
COPY --chown=node:node package.json .
COPY --chown=node:node nodemon.json .

USER node 

CMD [ "npm","run","dev" ]
