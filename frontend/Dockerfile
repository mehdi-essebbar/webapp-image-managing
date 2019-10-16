# Dockerfile for dev
FROM node:latest
EXPOSE 8080
RUN mkdir /frontend
WORKDIR /frontend
COPY . /frontend/
RUN npm install --no-progress --ignore-optional
CMD npm run start:dev
