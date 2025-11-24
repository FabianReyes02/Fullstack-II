# Frontend multi-stage Dockerfile: build with Node, serve with nginx

# Build stage
FROM node:18-alpine as build
WORKDIR /app

# allow setting API base url at build time (REACT_APP_API_URL)
ARG REACT_APP_API_URL=
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY package.json package-lock.json* ./
RUN npm install
COPY . .
# build will embed REACT_APP_API_URL into the static bundle
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
