FROM node:16.6-buster
RUN apt-get update && apt-get install -y libavahi-common-dev libavahi-client-dev build-essential
COPY . /opt/ndi-ember-mtx
COPY ./lib/x86_64-linux-gnu /usr/lib
WORKDIR /opt/ndi-ember-mtx
EXPOSE 5901/tcp
EXPOSE 9000/tcp
EXPOSE 5960-6100/tcp
EXPOSE 5960-6100/udp
CMD ["yarn", "start"]
