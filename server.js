// Javascript program to run the server using node.js packages
// calls the fedex.js program to return the price
const express = require('express');
const usps = require('./usps.js');
const app = express();
const port = 8080;

async function calcHandler(req, res) {
    const text = await usps.rateAsync(req.body);
    res.send(text);
}

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.post('/calc', calcHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

