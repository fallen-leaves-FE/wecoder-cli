import fs from 'fs'
import handlebars from 'handlebars'

export default (answers) => {
  const packageJson = `${answers.projectName}/package.json` // 这里可以指定你需要的路径
  const meta = {
      name: answers.projectName,
      description: answers.description,
      author: answers.author,
      version: answers.version
  }                 
  if (fs.existsSync(packageJson)){
      const content = fs.readFileSync(packageJson).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(packageJson, result)
  }
}