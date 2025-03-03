const dynamoose = require("dynamoose")


const connectDB = async () => {
    try {
        console.log(process.env.AWS_DEFAULT_REGION)
        // Create new DynamoDB instance
        const ddb = new dynamoose.aws.ddb.DynamoDB({
            "credentials": {
                "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
                "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
            },
            "region": process.env.AWS_DEFAULT_REGION,
            endpoint: process.env.DYNAMO_URI
        });

        // Set DynamoDB instance to the Dynamoose DDB instance
        dynamoose.aws.ddb.set(ddb);
        // dynamoose.aws.ddb.local(process.env.DYNAMO_URI);
        console.log("Dynamodb connected")
    }

    catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB