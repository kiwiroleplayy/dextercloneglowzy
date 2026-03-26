FROM node
WORKDIR /app

COPY package*.json ./

COPY . .
COPY .env ./
RUN yarn install

EXPOSE 3001
CMD ["yarn" , "Dev"]