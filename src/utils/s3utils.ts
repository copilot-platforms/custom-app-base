// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import { fromUtf8 } from '@aws-sdk/util-utf8-node'

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromUtf8 } = require("@aws-sdk/util-utf8-node");

type pushToS3 = {
    taskId: string
    jsonString: string
}

const PushToS3Bucket = async ({ taskId, jsonString } : pushToS3) => {
    // try {
        const payload = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${taskId}.json`,
            Body: fromUtf8(jsonString), // Convert the JSON string to a Buffer using fromUtf8
            ContentType: 'application/json',
        };

        // Create an instance of the S3 client using S3Client service client factory
        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });

        const command = new PutObjectCommand(payload)

        // Use the PutObjectCommand to upload the file and convert the response to a Promise
        const data = await s3Client.send(command);

        return {
            message: 'File uploaded successfully',
            data: {
                fileUrl: data.Location,
            },
        };
    // } catch (error) {
    //     if (error.name === 'NetworkingError') {
    //         throw {
    //             error: error.name,
    //             message: `Network error occurred: ${error.message}`,
    //         };
    //     } else if (error.name === 'NoSuchBucket' || error.name === 'NoSuchKey') {
    //         throw {
    //             error: error.name,
    //             message: `S3 bucket or key does not exist: ${error.message}`,
    //         };
    //     } else {
    //         throw {
    //             error: error.name,
    //             message: `Error uploading to S3: ${error.message}`,
    //         };
    //     }
    //}
};

export default PushToS3Bucket