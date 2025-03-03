const { S3Client, ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const connectS3 = () => {
    const s3Client = new S3Client({
        "credentials": {
            "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
            "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
        },
        "region": process.env.AWS_DEFAULT_REGION,
        endpoint: process.env.DYNAMO_URI
    })
    return s3Client
}

const uploadFileToS3 = async (fileStream, key) => {
    const s3Client = connectS3()
    const response = await s3Client.send(new PutObjectCommand({Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: fileStream
    }))
    return response
}

module.exports = {uploadFileToS3}
