function xmlrequest(){
  var pounds = 5;
  var ounces = 2;
  var userid = "098GIATR6369"; //"[userid]";
  var url = "http://production.shippingapis.com/ShippingAPI.dll";
  var payload =
    {
      "API" : "RateV4",
      "XML" : "<RateV4Request USERID=\"" + userid + "\"> \
                 <Revision/> \
                 <Package ID=\"1ST\"> \
                   <Service>PRIORITY</Service> \
                   <ZipOrigination>02211</ZipOrigination> \
                   <ZipDestination>90210</ZipDestination> \
                   <Pounds>" + pounds + "</Pounds> \
                   <Ounces>" + ounces + "</Ounces> \  // In our website, ounces = 0
                   <Container>RECTANGULAR</Container> \
                   <Size>LARGE</Size> \
                   <Width>15</Width> \
                   <Length>30</Length> \
                   <Height>15</Height> \
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