const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// Application
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

// Router
app.use(router);
app.use(cors());

app.listen(3000, () => {
    console.log("Listening on port 3000");
});