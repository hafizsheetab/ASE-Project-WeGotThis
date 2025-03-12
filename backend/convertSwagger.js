const fs = require("fs")
const { convertFromYaml } = require("./utils/convertFile")
const changeAllFilesToJS = async (rootDir) => {
    const files = fs.readdirSync(rootDir)
    for(const file of files){
        const [filename, extension] = file.split(".")
        if(extension === "yaml"){
            await convertFromYaml(`${rootDir}/${file}`, `${rootDir}/${filename}.js`)
        }
    }
}
module.exports = {changeAllFilesToJS}

