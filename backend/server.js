const executionType = process.argv[2]
require("dotenv").config({path: executionType === "docker" ? ".env.docker" : ".env"});
const express = require("express");
const app = express();
app.use(express.json({ extended: false }));
const connectDB = require("./config/db");
const { connectToRedis } = require("./config/redisClient");
const { enrollRoutes } = require("./modules");
const cors = require("cors");
const swaggerDocs = require("./config/swaggerDocs");
const { establishBucket } = require("./config/s3");
// const cors = require("cors");
// const cluster_server = require("./cluster_server");
app.use(cors())
swaggerDocs(app)
const PORT = process.env.HTTP_PORT || 8000;
app.listen(PORT, async () => {
  await connectDB()
  await connectToRedis()
  await enrollRoutes(app)
  await establishBucket()
    console.log("Server started on PORT: ", PORT);
  });

//Only for production
//cluster_server(app, PORT)
module.exports = app; // for testing