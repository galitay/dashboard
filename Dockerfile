FROM node:alpine
WORKDIR '/app'

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm","start"]
EXPOSE 3000
EXPOSE 3001