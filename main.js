const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors');

// Application
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.use('/', serveStatic(path.join(__dirname, '/client/dist')))

// Router
app.use(router);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});