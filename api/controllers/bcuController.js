const soapRequest = require('easy-soap-request');
const fs = require('fs');

// example data
params = [
    'Entrada' = {
      'FechaDesde' : '2017-10-17',
      'FechaHasta' : '2017-10-17',
      'Grupo'      : 2,
      'Moneda'     : {'item' : 2225}
    }
  ];
const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php';
const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};
//const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');

// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  console.log(headers);
  console.log(body);
  console.log(statusCode);
})();