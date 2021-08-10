FROM node:16-alpine AS build
WORKDIR /app
RUN apk add --no-cache git

COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./start.sh /app/
RUN yarn install
COPY . .

FROM node:16-alpine
WORKDIR /app
COPY --from=build /app /app/
RUN chmod +x /app/start.sh
CMD ./start.sh
