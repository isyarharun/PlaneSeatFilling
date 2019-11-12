const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/index')

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./api/routes')(app);
app.use(function (err, req, res, next) {
    console.error({
        url: req.url,
        params: req.params,
        body: req.body,
    });
    res.send({ error: err.message });
});

server = app.listen(config.port)
console.log(`Server started on port ${config.port}`)
