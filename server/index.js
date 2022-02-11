const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const routes = require("./routes/router");
const app = express();
let server = http.createServer(app);

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload({
    createParentPath: true
}));
app.use('/api/docs', routes);

server.listen(8080);