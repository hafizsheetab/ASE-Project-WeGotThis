require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json({ extende: false }));
const connectDB = require("./config/db");
const swaggerDocs = require("./swagger");
const { connectToRedis } = require("./config/redisClient");
const { enrollRoutes } = require("./modules");
const cors = require("cors")
// const cors = require("cors");
// const cluster_server = require("./cluster_server");
app.use(cors())
swaggerDocs(app)
const PORT = process.env.HTTP_PORT || 8000;
app.listen(PORT, async () => {
  await connectDB()
  await connectToRedis()
  await enrollRoutes(app)
  const User = require("./Schema/User");
  User
    console.log("Server started on PORT: ", PORT);
  });

//Only for production
//cluster_server(app, PORT)