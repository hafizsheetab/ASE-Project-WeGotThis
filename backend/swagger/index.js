const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Express Boilerplate API',
          version: '0.1',
        },
        servers: [
          {
            url: `${process.env.BASE_URL}/api`,
          },
        ]
      },
      apis: ['./modules/**/*.js'],
      
}

const swaggerSpec = swaggerJsDoc(options)

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("docs.json", (req, res) => {
        res.send(swaggerSpec)
    })
    console.log(`Docs available at ${process.env.BASE_URL}/api-docs`)
}


module.exports = swaggerDocs