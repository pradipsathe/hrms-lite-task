# -------- Build Stage --------
FROM node:20

WORKDIR /app

COPY package*.json ./

# Install ALL dependencies including devDependencies
RUN npm install --include=dev

COPY . .

RUN npm run build

# -------- Production Stage --------
FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]