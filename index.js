'use strict';

const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const { timer, getOrderMark } = require('./utils/timer');

const app = express();

app.use(express.json({ extended: true }));

const PORT = 5000;

app.listen(PORT, () => {});



const server = new WebSocket.Server({ port: PORT + 1 });

server.on('connection', ws => {
    ws.on('open',
        timer({
            initialMinute: 2,
            initialSeconds: 0,
            callback: () => {
                server.clients
                    .forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(getOrderMark()));
                        } else {
                            client.send(client);
                        }
                    })
            }
        }),
    );
})