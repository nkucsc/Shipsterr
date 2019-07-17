/*

This format is followed the USPS api

*/



function xmlrequest(){
  var origination = 02211;
  var destination = 90210;
  var pounds = 5;
  var ounces = 0;
  var width = 15;
  var length = 30;
  var height = 15;
  var userid = "098GIATR6369"; //"[userid]";
  var url = "http://production.shippingapis.com/ShippingAPI.dll";
  var payload =
    {
      "API" : "RateV4",
      "XML" : "<RateV4Request USERID=\"" + userid + "\"> \
                 <Revision/> \
                 <Package ID=\"1ST\"> \
                   <Service>PRIORITY</Service> \
                   <ZipOrigination>origination</ZipOrigination> \
                   <ZipDestination>destination</ZipDestination> \
                   <Pounds>" + pounds + "</Pounds> \
                   <Ounces>" + ounces + "</Ounces> \  // In our website, ounces = 0
                   <Container>RECTANGULAR</Container> \
                   <Size>LARGE</Size> \
                   <Width>width</Width> \
                   <Length>length</Length> \
                   <Height>height</Height> \
                   <Girth>55</Girth> \     // I don'tknow what this is, anyone helps me?
                 </Package> \
               </RateV4Request>"
    };

  var options={
    method:"POST",
    payload:payload
  }

  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
};