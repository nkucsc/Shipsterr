// Javascript program to call usps APIs
// includes input from html form

const fetch = require('node-fetch');

const PRODUCTION_URL = 'http://production.shippingapis.com/ShippingAPI.dll';
// const TESTING_URL = `http://production.shippingapis.com/ShippingApi.dll?API=RateV4&XML=<RateV4Request USERID="USPS_SERVICE_TYPE">


// keys

const USPS_SERVICE_TYPE = '098GIATR6369';


// function that makes an xml form to send to the API
// it contains macros for all the variables

function parseService(body) {
    if(body.service_Type === "Ground Shipping") {
        return "RETAIL GROUND";
    } else if (body.service_Type === "2 Business Day") {
        return "PRIORITY";
    } else if (body.service_Type === "1 Business Day") {
        return "PRIORITY EXPRESS";
    }
}

const makeXml = (body) => 
`http://production.shippingapis.com/ShippingApi.dll?API=RateV4&XML=<RateV4Request USERID="USPS_SERVICE_TYPE">

<Package ID="1ST"> 
<Service>${parseService(body)}</Service> 
<ZipOrigination>${body.shipper_ZipCode}</ZipOrigination> 
<ZipDestination>${body.recipient_ZipCode}</ZipDestination> 
<Pounds>${body.weight_Value}</Pounds> 
<Ounces>5</Ounces> 
<Container>NONRECTANGULAR</Container> 
<Size>LARGE</Size> 
<Width>${body.package_Width}</Width> 
<Length>${body.package_Length}</Length> 
<Height>${body.package_Height}</Height> 
<Girth>${2*(body.package_Height + body.package_Width)}</Girth>
<Machinable>True</Machinable>
</Package> 
</RateV4Request> `;

// main rate function
// calls the API and returns the rate or an error if the API returns an error
// for incorrect input
async function uspsRateAsync(body) {
    const url = makeXml(body);
    const res = await fetch(url, { method: 'POST' }); // fetch to the API
    const resXml = await res.text();
    //const result = resXml.match(/<HighestSeverity>([^<]+)<\/HighestSeverity>/);
    if (res.status === 200) { // if the API call was successful
        const regex = /<Rate>([^<]+)<\/Rate>/;
        const match = resXml.match(regex);
        const price = match !== null ? match[1] : "NaN";
        return `$${price}`;
    } else {
        const regex = /<Postage CLASSID="1"><MailService>Priority Mail 2-Day&amp;lt;sup&amp;gt;&amp;#8482;&amp;lt;\/sup&amp;gt;<\/MailService><Rate>([^<]+)<\/Rate><\/Postage>/;
        const match = resXml.match(regex);
        const error = match !== null ? match[1] : "unknown error";
        return `Error: ${error}`;
    }
}

module.exports.uspsRateAsync = uspsRateAsync;