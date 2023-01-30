FROM node:16-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["yarn", "run", "dev"]