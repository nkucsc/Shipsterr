// Javascript program to run the server using node.js packages
// calls the fedex.js program to return the price
const express = require('express');
const fedex = require('./fedex.js');
const ups = require('./ups.js');
const usps = require('./usps.js');
const app = express();
const port = 8080;

async function calcHandler(req, res) {
    var text = await fedex.fedexRateAsync(req.body);
    text += await ups.upsRateAsync(req.body);
    text += await usps.uspsRateAsync(req.body);
    res.send(text);
}

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.post('/calc', calcHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

