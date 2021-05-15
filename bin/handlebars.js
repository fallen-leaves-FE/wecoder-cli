const fs = require('fs')
const handlebars = require('handlebars')
module.exports = (answers) => {
  const packageJson = `${answers.projectName}/package.json` // 这里可以指定你需要的路径
  const meta = {
      name: answers.projectName,
      description: answers.description,
      author: answers.author,
      version: answers.version,
      homepage: answers.basename
  }                 
  if (fs.existsSync(packageJson)){
      const content = fs.readFileSync(packageJson).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(packageJson, result)
  }
  if (answers.basename) {
    const routerJs = `${answers.projectName}/src/router/index.js`
    const routerTs = `${answers.projectName}/src/router/index.ts`
    if (fs.existsSync(routerJs)) {
      const content = fs.readFileSync(routerJs).toString()
      const result = handlebars.compile(content)({
        basename: answers.basename
      })
      fs.writeFileSync(routerJs, result)
    } else if (fs.existsSync(routerTs)) {
      const content = fs.readFileSync(routerTs).toString()
      const result = handlebars.compile(content)({
        basename: answers.basename
      })
      fs.writeFileSync(routerTs, result)
    }
  }
}