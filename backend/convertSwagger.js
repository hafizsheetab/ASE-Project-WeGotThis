const fs = require("fs")
const { convertFromYaml } = require("./utils/convertFile")
const changeAllFilesToJS = (rootDir) => {
    const files = fs.readdirSync(rootDir)
    files.map(file => {
        const [filename, extension] = file.split(".")
        if(extension === "yaml"){
            convertFromYaml(`${rootDir}/${file}`, `${rootDir}/${filename}.js`)
        }
    })
}
module.exports = {changeAllFilesToJS}

