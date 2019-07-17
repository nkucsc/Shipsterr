// Javascript program to call fedex APIs
// includes input from html form
const fetch = require('node-fetch');

const PRODUCTION_URL = 'https://ws.fedex.com:443/web-services/rate';
const TESTING_URL = 'https://wsbeta.fedex.com:443/web-services/rate';

// keys
const FEDEX_ACCOUNT_NUMBER = '510088000';
const FEDEX_METER_NUMBER = '100417677';
const FEDEX_KEY = 'HaaYYa3AMmOQGZYL';
const FEDEX_PASSWORD = '8JihjDHJ6KSnSApCtGjtEopoa';
const FEDEX_SERVICE_TYPE = 'FEDEX_GROUND';

// function that makes an xml form to send to the API
// it contains macros for all the variables

const makeXml = (body) => 
`<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://fedex.com/ws/rate/v24">
<SOAP-ENV:Body>
<RateRequest>
  <WebAuthenticationDetail>
    <UserCredential>
      <Key>${FEDEX_KEY}</Key>
      <Password>${FEDEX_PASSWORD}</Password>
    </UserCredential>
  </WebAuthenticationDetail>
  <ClientDetail>
    <AccountNumber>${FEDEX_ACCOUNT_NUMBER}</AccountNumber>
    <MeterNumber>${FEDEX_METER_NUMBER}</MeterNumber>
  </ClientDetail>
  <Version>
    <ServiceId>crs</ServiceId>
    <Major>24</Major>
    <Intermediate>0</Intermediate>
    <Minor>0</Minor>
  </Version>
  <ReturnTransitAndCommit>true</ReturnTransitAndCommit>
  <RequestedShipment>
    <ServiceType>${FEDEX_SERVICE_TYPE}</ServiceType>
    <Shipper>
      <Address>
        <StreetLines>${body.shipper_Address}</StreetLines>
        <City>${body.shipper_City}</City>
        <StateOrProvinceCode>${body.shipper_State}</StateOrProvinceCode>
        <PostalCode>${body.shipper_ZipCode}</PostalCode>
        <CountryCode>${body.shipper_Country}</CountryCode>
      </Address>
    </Shipper>
    <Recipient>
      <Address>
        <StreetLines>${body.recipient_Address}</StreetLines>
        <City>${body.recipient_City}</City>
        <StateOrProvinceCode>${body.recipient_State}</StateOrProvinceCode>
        <PostalCode>${body.recipient_ZipCode}</PostalCode>
        <CountryCode>${body.recipient_Country}</CountryCode>
      </Address>
    </Recipient>
    <ShippingChargesPayment>
      <PaymentType>SENDER</PaymentType>
    </ShippingChargesPayment>
    <PackageCount>1</PackageCount>
    <RequestedPackageLineItems>
      <GroupPackageCount>1</GroupPackageCount>
      <Weight>
        <Units>${body.weight_Units}</Units>
        <Value>${body.weight_Value}</Value>
      </Weight>
      <Dimensions>
        <Length>${body.package_Length}</Length>
        <Width>${body.package_Width}</Width>
        <Height>${body.package_Height}</Height>
        <Units>${body.package_Units}</Units>
      </Dimensions>
    </RequestedPackageLineItems>
  </RequestedShipment>
</RateRequest>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

// main rate function
// calls the API and returns the rate or an error if the API returns an error
// for incorrect input
async function rateAsync(body) {
    const reqXml = makeXml(body);
    const res = await fetch(TESTING_URL, { method: 'POST', body: reqXml }); // fetch to the API
    const resXml = await res.text();
    const result = resXml.match(/<HighestSeverity>([^<]+)<\/HighestSeverity>/);
    if (res.status === 200 && result[1] === "SUCCESS") { // if the API call was successful
        const regex = /<TotalNetChargeWithDutiesAndTaxes><Currency>USD<\/Currency><Amount>([^<]+)<\/Amount><\/TotalNetChargeWithDutiesAndTaxes>/;
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