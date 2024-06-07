const keepAlive = require('./server');
const Monitor = require('ping-monitor');

keepAlive();
const monitor = new Monitor({
    website: 'https://0137b1cf-c204-4849-bf00-14452970fc6f-00-3rex8pf0sl8of.sisko.replit.dev:8080/',
    title: 'NAME',
    interval: 2
});

monitor.on('up', (res) => console.log(`${res.website} its on.`));
monitor.on('down', (res) => console.log(`${res.website} it has died - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} has stopped.`) );
monitor.on('error', (error) => console.log(error));