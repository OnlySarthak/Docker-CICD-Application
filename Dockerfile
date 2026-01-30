FROM node:20 AS base
WORKDIR /usr/src/app
COPY package* .
RUN npm install

FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . .
EXPOSE 3000
CMD ["npm", "start"]



