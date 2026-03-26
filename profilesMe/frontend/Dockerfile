FROM node
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install
RUN yarn global add serve
RUN yarn build
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]