FROM node:13.12.0

COPY ngfg.client ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
