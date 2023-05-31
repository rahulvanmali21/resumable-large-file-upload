const s3rver = require('s3rver');
const corsConfig = require.resolve('s3rver/example/cors.xml');
const websiteConfig = require.resolve('s3rver/example/website.xml');
const fs = require("fs");
require('dotenv').config()


console.log(process.env.ADDRESS,process.env.PORT,process.env.BUCKET)

// Configuration options for s3rver
const options = {
  address: process.env.ADDRESS,
  port: process.env.PORT, // Port on which s3rver will run
  silent: false, // Set to true to suppress console output
  directory: './s3-data', // Directory to store the data files
  configureBuckets:[
    {
      name:process.env.BUCKET,
      configs: [fs.readFileSync(corsConfig), fs.readFileSync(websiteConfig)],
    }
  ]
};

// Start the s3rver
const server = new s3rver(options).run(async(err, hostname) => {
  if (err) {
    console.error('Error starting s3rver:', err);
  } else {
    console.log(`s3rver is running at ${hostname.port}`);
  }

});

// Gracefully handle process termination
process.on('SIGINT', () => {
  server.close(() => {
    console.log('s3rver has stopped');
    process.exit(0);
  });
});