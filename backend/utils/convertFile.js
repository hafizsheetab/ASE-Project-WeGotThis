const fs = require("fs")
const readLine = require("readline")
const convertFromYaml = async(fileUrl, destinationFileUrl) => {
    let openApiString = 
`
/**
 * @openapi
`
    const file = fs.createReadStream(fileUrl)
    const rl = readLine.createInterface({
        input: file,
        crlfDelay: Infinity
    })
    for await (const line of rl){
        openApiString = openApiString + ` * ` + line + "\r"
    }
    openApiString = openApiString + `*/`
    fs.writeFileSync(destinationFileUrl, openApiString)
}
const convertToYaml = async (fileUrl, destinationFileUrl) => {
    let yamlString = ""
    const file = fs.createReadStream(fileUrl)
    const rl = readLine.createInterface({
        input: file,
        crlfDelay: Infinity
    })
    for await (const line of rl){
        if(line.includes(`/**`) || line.includes("@openapi") || line.includes("*/")) {
            continue
        }
        yamlString = yamlString + line.replace(" * ", "") + "\r"
    }
    fs.writeFileSync(destinationFileUrl, yamlString)
}

module.exports = {convertFromYaml, convertToYaml}