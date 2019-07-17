const express = require('express');
const ups = require('./ups.js');
const app = express();
const port = 8080;

async function calcHandler(req, res) {
    const text = await ups.rateAsync(req.body);
    res.send(text);
}

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.post('/calc', calcHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));