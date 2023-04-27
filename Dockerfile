FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm install --prefix client --omit=dev

COPY server/package*.json server/
RUN npm install --prefix server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node
CMD [ "npm", "run", "deploy"]

EXPOSE 8000