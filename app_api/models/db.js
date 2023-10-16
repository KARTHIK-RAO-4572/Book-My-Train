const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const readLine = require('readline');
const app = require('../../app')

let dbURL = 'mongodb+srv://KARTHIKRAO:wpm@cluster0.45rt9q7.mongodb.net/?retryWrites=true&w=majority';

const connect = () => {
    setTimeout(() => mongoose.connect(dbURL), 1000);
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURL);
});

mongoose.connection.on('error', err => {
    console.log('Error: ' + err);
    return connect();
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected');
});

if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

async function gracefulShutdown(msg) {
    const closed = await mongoose.connection.close()
        .then(function () {
            console.log(`Mongoose disconnected through ${msg}`);
            process.exit();
        });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    gracefulShutdown('Cyclic app shutdown', () => {
        process.exit(0);
    });
});
connect();
