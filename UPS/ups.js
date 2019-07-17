const fetch = require('node-fetch');

const PRODUCTION_URL = 'https://wwwcie.ups.com/ups.app/xml/Rate';
const TESTING_URL = 'https://onlinetools.ups.com/ups.app/xml/Rate';

const upsId = "ckhuang18";
const upsPw = "Shipsterr115";
const upsKey = "FD665C9244786FF5";

var shipToAddress = "1230 Shaffer Road";
var shipToCity = "Santa Cruz";
var shipToState = "CA";
var shipToZip = 95060;

var shipFromAddress = "8 Holly Street";
var shiptFromCity = "Irvine";
var shipFromState = "CA";
var shipFromZip = "92612";

var weight = 5;
var length = 10;
var width = 5
var height = 7;

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
                <AddressLine1>${body.shipFromAddress}</AddressLine1>
                <City>${body.shiptFromCity}</City>
                <StateProvinceCode>${body.shipFromState}</StateProvinceCode>
                <PostalCode>${body.shipFromZip}</PostalCode>
                <CountryCode>US</CountryCode>
            </Address>
        </Shipper>
        <ShipTo>
            <CompanyName>Ship To Company Name</CompanyName>
            <AttentionName>Ship To Attention Name</AttentionName>
            <PhoneNumber>1234567890</PhoneNumber>
            <FaxNumber>1234567890</FaxNumber>
            <Address>
                <AddressLine1>${body.shipToAddress}</AddressLine1>
                <City>${body.shipToCity}</City>
                <StateProvinceCode>${body.shipToState}</StateProvinceCode>
                <PostalCode>${body.shipToZip}</PostalCode>
                <CountryCode>US</CountryCode>
            </Address>
        </ShipTo>
        <ShipFrom>
            <CompanyName>Ship From Company Name</CompanyName>
            <AttentionName>Ship From Attention Name</AttentionName>
            <PhoneNumber>1234567890</PhoneNumber>
            <FaxNumber>1234567890</FaxNumber>
            <Address>
                <AddressLine1>${body.shipFromAddress}</AddressLine1>
                <City>${body.shiptFromCity}</City>
                <StateProvinceCode>${body.shipFromState}</StateProvinceCode>
                <PostalCode>${body.shipFromZip}</PostalCode>
                <CountryCode>US</CountryCode>
            </Address>
        </ShipFrom>
        <Service>
            <Code>03</Code>
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
                <Weight>${body.weight}</Weight>
            </PackageWeight>
            <Dimensions>
                <Length>${body.length}</Length>
                <Width>${body.width}</Width>
                <Height>${body.height}</Height>
            </Dimensions>
        </Package>
    </Shipment>
</RatingServiceSelectionRequest>`;

async function rateAsync(body) {
    const reqXml = makeXml(body);
    const res = await fetch(TESTING_URL, { method: 'POST', body: reqXml }); // fetch to the API
    const resXml = await res.text();
    const result = resXml.match(/<HighestSeverity>([^<]+)<\/HighestSeverity>/);
    if (res.status === 200 && result[1] === "SUCCESS") { // if the API call was successful
        const regex = /<TotalCharges><CurrencyCode>USD<\/Currency><MonetaryValue>([^<]+)<\/MonetaryValue><\/TotalCharges>/;
        const match = resXml.match(regex);
        const price = match !== null ? match[1] : "NaN";
        return `Price is: ${price}`;
    } else {
        const regex = /<Message>([^<]+)<\/Message>/;
        const match = resXml.match(regex);
        const error = match !== null ? match[1] : "unknown error";
        return `Error: ${error}`;
    }
}

module.exports.rateAsync = rateAsync;