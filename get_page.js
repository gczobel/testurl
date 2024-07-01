const https = require('https');
const dns = require('dns');

const url = 'https://www.google.com';
const hostname = new URL(url).hostname;
const maxOutputLength = 300;

dns.lookup(hostname, (err, address, family) => {
  if (err) {
    console.error('DNS lookup failed:', err);
    return;
  }

  console.log(`IP address: ${address}`);

  let outputLength = 0;

  https.get(url, (response) => {
    console.log('Response Status:', response.statusCode);
    response.on('data', (chunk) => {
      if (outputLength < maxOutputLength) {
        const remainingLength = maxOutputLength - outputLength;
        const chunkStr = chunk.toString();
        const toPrint = chunkStr.slice(0, remainingLength);
        console.log(toPrint);
        outputLength += toPrint.length;
      }
      if (outputLength >= maxOutputLength) {
        response.destroy(); // Stop receiving data
      }
    });
  }).on('error', (error) => {
    console.error('Error fetching page content:', error);
  });
});
