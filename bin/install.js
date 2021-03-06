const exec = require('child_process').exec

const installMethod = (path, command) => {
  return new Promise((resolve, reject) => {
    install = exec(command, {
      cwd: `./${path}`
    }, (error, stdout, stderr) => {
      if (error) {
        reject(error.toString())
      } else if (stderr) {
        reject(stderr.toString())
      } else {
        console.log(stdout)
      }
    })
    install.on('exit', (code) => {
      resolve()
    })
  })
}
module.exports = installMethod