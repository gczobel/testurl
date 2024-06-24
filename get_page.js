const https = require('https');
const dns = require('dns');

const url = 'https://login.yahav.co.il/login/';

function getPageContent(address) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false, // Ignore SSL certificate validation for simplicity (not recommended in production)
    }, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
      response.on('error', (error) => {
        reject(error);
      });
    });
  });
}

dns.lookup(url.hostname, (err, address) => {
  if (err) {
    console.error('Error resolving hostname:', err);
  } else {
    console.log('Resolved IP address:', address);
    getPageContent(address)
      .then((data) => console.log('Page content:', data.substring(0, 1000) + '... (truncated)')) // Print only first 1000 characters for brevity
      .catch((error) => console.error('Error fetching page content:', error));
  }
});