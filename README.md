# NDI-EMBER-MTX

NDI Matrice with Ember control for NDI - VSM integration
The NDI MTX creates virtual targets (defined in target.json file) that you can select from your NDI Decoder (E.g. vMix or a Birddog)

It's build with static installations in mind, so it's not using discovering protocol for finding sources. But instead a static list in sources.json file.

## Matrix view:
<img src="doc/mtx.png">

## Client Panel view:
<img src="doc/clientpanel.png">

## Installation: 
(ubuntu 20.04lts on Intel based machine)

### Setup in storage folder:
sources.json is the list of sources remember to add dnsName AND url
targets.json is the name of targets, you can add up to 100 in current configuration.

### Build and run:
ndi_mtx.cc will build when yarn is called.
(c compiler on machine is needed)
```
apt-get update && apt-get install -y libavahi-common-dev libavahi-client-dev build-essential
clone and cd to ndi-ember-mtx folder
install nodejs and yarn
cp ./lib/x86_64-linux-gnu/* /usr/lib/
yarn
yarn build-server
yarn build-client
yarn start
```

Open MTX GUI in chrome:
```
http://localhost:5901
```

Open CLIENT PANEL GUI in chrome:
```
http://localhost:5901/?target=2
```

Connect to Ember server on port: 9000

## REST API
You can change connections from REST API with:
```
POST http://localhost:5901/setmatrix?source=8&target=3
```
And /state returns JSON with current state:
```
http://localhost:5901/state
```

## Example of autostart using systemd:
(based on standard install of nodejs and user named ndi)

create start.sh file in ndi-ember-mtx folder:
```
#!/bin/bash
while true; do
    echo "Starting NDI MTX"
    cd /home/ndi/ndi-ember-mtx
    /etc/bin/node build/server/index.js
    sleep 2
done
```

create systemd service file /etc/systemd/system/ndimtx.service
```
[Unit]
After=network.service

[Service]
Type=simple
ExecStart=/home/ndi/ndi-ember-mtx/start.sh
WorkingDirectory=/home/ndi/ndi-ember-mtx
StandardOutput=syslog
StandardError=syslog
User=ndi

[Install]
WantedBy=multi-user.target
```
start service with:
```
systemctl start ndimtx.service
```


Big thanks goes to Streampunk Media for Node-API c bindings inspiration

