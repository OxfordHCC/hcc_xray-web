FROM node:lts as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build server
CMD ["node", "./projects/server/build"]
