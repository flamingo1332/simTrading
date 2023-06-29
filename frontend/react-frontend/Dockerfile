FROM node:lts-bullseye

WORKDIR /app

# 리액트 앱에 환경변수 넣으려면 이렇게 해야함
ARG REACT_APP_FRONTEND_URL
ARG REACT_APP_BACKEND_URL

ENV REACT_APP_FRONTEND_URL $REACT_APP_FRONTEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

COPY package.json .

# Install app dependencies and build production version of the app
RUN npm install

COPY . .

# Expose port 3000
EXPOSE 3000

CMD npm start