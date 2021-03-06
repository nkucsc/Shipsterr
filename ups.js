//This allows the program to run the node-fetch module
require('dotenv').config();
const fetch = require('node-fetch');

//API URLs given in the documentation
const TESTING_URL = 'https://wwwcie.ups.com/ups.app/xml/Rate';
const PRODUCTION_URL = 'https://onlinetools.ups.com/ups.app/xml/Rate';

//UPS credentials
const upsId = process.env.UPS_ID;
const upsPw = process.env.UPS_PASSWORD;
const upsKey = process.env.UPS_KEY;

//Allows dynamic selection of rates based on user input
function parseService(body) {
    if(body.service_Type === "Ground Shipping") {
      return "03";
    } else if (body.service_Type === "2 Business Day") {
      return "02";
    } else if (body.service_Type === "1 Business Day") {
      return "01";
    }
  }

//xml form that is sent to the api with macros inside for a dynamic api.
const makeXml = (body) =>
`<?xml version="1.0"?>
<AccessRequest xml:lang="en-US">
    <AccessLicenseNumber>${upsKey}</AccessLicenseNumber>
    <UserId>${upsId}</UserId>
    <Password>${upsPw}</Password>
</AccessRequest>
<?xml version="1.0"?>
<RatingServiceSelectionRequest xml:lang="en-US">
    <Request>
        <TransactionReference>
            <CustomerContext>Your Customer Context</CustomerContext>
        </TransactionReference>
        <RequestAction>Rate</RequestAction>
        <RequestOption>Rate</RequestOption>
    </Request>
    <Shipment>
        <Shipper>
            <Name>Shipper Name</Name>
            <AttentionName>Shipper Attention Name</AttentionName>
            <PhoneNumber>1234567890</PhoneNumber>
            <FaxNumber>1234567890</FaxNumber>
            <ShipperNumber>Your Shipper Number</ShipperNumber>
            <Address>
                <AddressLine1>${body.shipper_Address}</AddressLine1>
                <City>${body.shipper_City}</City>
                <StateProvinceCode>${body.shipper_State}</StateProvinceCode>
                <PostalCode>${body.shipper_ZipCode}</PostalCode>
                <CountryCode>US</CountryCode>
            </Address>
        </Shipper>
        <ShipTo>
            <CompanyName>Ship To Company Name</CompanyName>
            <AttentionName>Ship To Attention Name</AttentionName>
            <PhoneNumber>1234567890</PhoneNumber>
            <FaxNumber>1234567890</FaxNumber>
            <Address>
                <AddressLine1>${body.recipient_Address}</AddressLine1>
                <City>${body.recipient_City}</City>
                <StateProvinceCode>${body.recipient_State}</StateProvinceCode>
                <PostalCode>${body.recipient_ZipCode}</PostalCode>
                <CountryCode>US</CountryCode>
            </Address>
        </ShipTo>
        <ShipFrom>
            <CompanyName>Ship From Company Name</CompanyName>
            <AttentionName>Ship From Attention Name</AttentionName>
            <PhoneNumber>1234567890</PhoneNumber>
            <FaxNumber>1234567890</FaxNumber>
            <Address>
                <AddressLine1>${body.shipper_Address}</AddressLine1>
                <City>${body.shipper_City}</City>
                <StateProvinceCode>${body.shipper_State}</StateProvinceCode>
                <PostalCode>${body.shipper_ZipCode}</PostalCode>
                <CountryCode>US</CountryCode>
            </Address>
        </ShipFrom>
        <Service>
            <Code>${parseService(body)}</Code>
            <Description>UPS Ground</Description>
        </Service>
        <Package>
            <PackagingType>
                <Code>02</Code>
                <Description>UPS Package</Description>
            </PackagingType>
            <PackageWeight>
                <UnitOfMeasurement>
                    <Code>LBS</Code>
                </UnitOfMeasurement>
                <Weight>${body.weight_Value}</Weight>
            </PackageWeight>
            <Dimensions>
                <Length>${body.package_Length}</Length>
                <Width>${body.package_Width}</Width>
                <Height>${body.package_Height}</Height>
            </Dimensions> 
        </Package>
    </Shipment>
</RatingServiceSelectionRequest>`;

//Grabs the price we need from the response xml with regex
async function upsRateAsync(body) {
    const reqXml = makeXml(body);
    const res = await fetch(TESTING_URL, { method: 'POST', body: reqXml }); // fetch to the API
    const resXml = await res.text();
    const result = resXml.match(/<ResponseStatusDescription>([^<]+)<\/ResponseStatusDescription>/);
    if (res.status === 200 && result[1] === "Success") { // if the API call was successful
        const regex = /<TotalCharges><CurrencyCode>USD<\/CurrencyCode><MonetaryValue>([^<]+)<\/MonetaryValue><\/TotalCharges>/;
        const match = resXml.match(regex);
        const price = match !== null ? match[1] : "NaN";
        return `$${price}`;
    } else {
        const regex = /<ErrorDescription>([^<]+)<\/ErrorDescription>/;
        const match = resXml.match(regex);
        const error = match !== null ? match[1] : "unknown error";
        return `Error: ${error}`;
    }
}

//exports method to allow main file to use this function.
module.exports.upsRateAsync = upsRateAsync;
