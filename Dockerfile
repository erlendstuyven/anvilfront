FROM node:6.10.0-alpine
ADD dist /opt/dist
ADD server /opt/server
ADD node_modules /opt/server/node_modules
ENTRYPOINT ["node", "/opt/server/index.js"]
