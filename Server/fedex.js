const fetch = require('node-fetch');
// const xml2js = require('xml2js');
// const util = require('util');
// xml2js.parseStringAsync = util.promisify(xml2js.parseString);

const PRODUCTION_URL = 'https://ws.fedex.com:443/web-services/rate';
const TESTING_URL = 'https://wsbeta.fedex.com:443/web-services/rate';

const FEDEX_ACCOUNT_NUMBER = '510088000';
const FEDEX_METER_NUMBER = '100417677';
const FEDEX_KEY = 'HaaYYa3AMmOQGZYL';
const FEDEX_PASSWORD = '8JihjDHJ6KSnSApCtGjtEopoa';
const FEDEX_SERVICE_TYPE = 'FEDEX_GROUND';
// var shipper_Address = '10 Fed Ex Pkwy';
// var shipper_City = 'Memphis';
// var shipper_State = 'TN';
// var shipper_ZipCode = '38115';
// var shipper_Country = 'US';
// var recipient_Address = '13450 Farmcrest Ct';
// var recipient_City = 'Herndon';
// var recipient_State = 'VA';
// var recipient_ZipCode = '20171';
// var recipient_Country = 'US';
// var weight_Units = 'LB';
// var weight_Value = '2';
// var package_Length = '2';
// var package_Width = '2';
// var package_Height = '2';
// var package_Units = 'IN';


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

async function rateAsync(body) {
    const reqXml = makeXml(body);
    const res = await fetch(TESTING_URL, { method: 'POST', body: reqXml });
    const resXml = await res.text();
    // console.log(resXml);
    const result = resXml.match(/<HighestSeverity>([^<]+)<\/HighestSeverity>/);
    if (res.status === 200 && result[1] === "SUCCESS") {
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
    // const obj = await xml2js.parseStringAsync(xml, { explicitArray: false });
    // const text = JSON.stringify(obj);
    // console.log(text);
    // const reply = obj["SOAP-ENV:Envelope"]["SOAP-ENV:Body"];
    // const price = reply.RateReply.RateReplyDetails.RatedShipmentDetails.ShipmentRateDetail.TotalNetChargeWithDutiesAndTaxes.Amount;
}

module.exports.rateAsync = rateAsync;