# ==== CONFIGURE =====
FROM node:18.7.0
WORKDIR /src
# Copy app files
COPY . .
RUN npm ci
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD [ "npx", "serve", "build" ]
