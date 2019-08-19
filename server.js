const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const cors = require('cors');
const io = require('./app/io');
require('dotenv').config({
    path: './.env'
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers', Content-Length, API-KEY, SESSION-KEY, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if ('OPTIONS' === req.method) { //intercepts OPTIONS method
        res.sendStatus(200);
    } else {
        next();
    }
});

//Swagger Configuration
if (process.env.SWAGGER == 'yes') {
    const swaggerSpec = require('./config/swagger.config');
    app.get('/api-docs.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.send(swaggerSpec.swaggerMobileSpec);
    });
}
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('public'));

const { connection } = require('./config/mongo.config');
process.on('SIGINT', closeDBConnection);

const router = require('./app/routes/api.routes');
app.use('/api', router);

// Get port from environment and store in Express.
const port = parseInt(process.env.APP_PORT, 10);
app.set('port', port);

const server = http.createServer(app);

io(server);

server.listen(port, "127.0.0.1");

server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const timestamp = new Date().toLocaleString();
    console.log(timestamp);
    console.log('App is listening on port', addr.port);
}


// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// When application is terminated, close connection to database
function closeDBConnection() {
    connection.close(function () {
        process.exit(0);
    });
}
