// Javascript program to run the server using node.js packages
// calls the fedex.js program to return the price
const express = require('express');
const fedex = require('./fedex.js');
const ups = require('./ups.js');
const usps = require('./usps.js');
const app = express();
const port = 8080;

const makeResponse = (fedexPrice, upsPrice, uspsPrice) => 
`<!doctype html>
<html>
  <body>
    <p>Fedex: ${fedexPrice}</p>
    <p>UPS: ${upsPrice}</p>
    <p>USPS: ${uspsPrice}</p>
    <button onclick="history.back()">Calc Again</button>
  </body>
</html>`;

async function calcHandler(req, res) {
    const fedexPrice = await fedex.fedexRateAsync(req.body);
    const upsPrice = await ups.upsRateAsync(req.body);
    const uspsPrice = await usps.uspsRateAsync(req.body);
    const html = makeResponse(fedexPrice, upsPrice, uspsPrice);
    res.send(html);
}

app.use(express.static('website'));
app.use(express.urlencoded({ extended: true }));
app.post('/calc', calcHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

