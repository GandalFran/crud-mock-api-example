# First stage - Build the application
FROM node:14 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Second stage - Copy build artifacts to a lightweight runtime image
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app /app

# set default values for enviromental variables

ENV FILE_MODEL_PATH ./model
ENV HTTP_PORT 80
ENV HTTPS_PORT 443

ENV NODE_ENV=production

# expose ports

EXPOSE $HTTP_PORT
EXPOSE $HTTPS_PORT


CMD ["npm", "run", "start"]