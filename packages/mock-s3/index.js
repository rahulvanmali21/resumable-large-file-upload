const s3rver = require('s3rver');

// Configuration options for s3rver
const options = {
  address: 'localhost',
  port: 4569, // Port on which s3rver will run
  silent: false, // Set to true to suppress console output
  directory: './s3-data' // Directory to store the data files
};

// Start the s3rver
const server = new s3rver(options).run(async(err, hostname) => {
  if (err) {
    console.error('Error starting s3rver:', err);
  } else {
    console.log(`s3rver is running at ${hostname.port}`);
  }

  // Create a new bucket
  try {
    const s3Client = server.getS3Client();
    const bucketName = 'my-bucket';
    await s3Client.createBucket({ Bucket: bucketName }).promise();
    console.log(`Bucket "${bucketName}" created successfully.`);
  } catch (error) {
    console.error('Error creating bucket:', error);
  }




});

// Gracefully handle process termination
process.on('SIGINT', () => {
  server.close(() => {
    console.log('s3rver has stopped');
    process.exit(0);
  });
});