const cron = require('cron');
const url = require('url');
const http = require('http');
const https = require('https');

// Use environment variable or fallback to localhost
const backendUrl = process.env.KEEP_ALIVE_URL || `http://localhost:${process.env.PORT || 3000}`;
const parsedUrl = new URL(backendUrl);
const protocol = parsedUrl.protocol === 'https:' ? https : http;

const job = new cron.CronJob('*/15 * * * *', function () {
  console.log(`[${new Date().toISOString()}] Pinging backend to keep alive...`);
  protocol.get(backendUrl, (res) => {
    if (res.statusCode === 200) {
      console.log('Backend is alive!');
    } else {
      console.error(`Failed to ping backend, status code: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error('Error during keep-alive ping:', err.message);
  });
});

// Start the cron job
// job.start();

// Export the cron job (optional, for testing or integration)
module.exports = { job }; 