FROM node:6.10.0-alpine
ADD dist /opt/dist
ADD server /opt/server
RUN cd /opt/server && npm install express express-http-proxy
ENTRYPOINT ["node", "/opt/server/index.js"]
