# Dockerfile
FROM node:10.15.0

# create destination directory
RUN mkdir -p /usr/src/nuxtjs-currency
WORKDIR /usr/src/nuxtjs-currency

# copy the app, note .dockerignore
COPY . /usr/src/nuxtjs-currency/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]