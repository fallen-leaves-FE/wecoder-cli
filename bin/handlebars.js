const fs = require('fs')
const handlebars = require('handlebars')
module.exports = (answers) => {
  const fileName = `${answers.projectName}/package.json`; // 这里可以指定你需要的路径
  const meta = {
      name: answers.projectName,
      description: answers.description,
      author: answers.author,
      version: answers.version
  }                 
  if(fs.existsSync(fileName)){
      const content = fs.readFileSync(fileName).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(fileName, result)
  }
}