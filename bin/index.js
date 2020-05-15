#! /usr/bin/env node
const program = require('commander')
const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const inquirer = require('inquirer')
const version = require('../package.json').version
const templateMaps = require('../template.json')
const spinner = ora('正在下载模板...')

const questions = [
    {
        type: 'list',
        name: 'template',
        message: '请选择模板',
        choices: [
            {
                name: 'react项目模板',
                value: '1'
            },
            {
                name: 'koa && ejs服务端渲染模板',
                value: '2'
            },
            {
                name: '基于webpack的typescript学习模板',
                value: '3'
            }
        ]
    }
]

program.version(version, '-v, --version')
       .command('init <name>')
       .action((name) => {
            inquirer
            .prompt(questions)
            .then(choose => {
                  spinner.start()
                  download(templateMaps[choose.template], name, {clone: true}, (err) => {
                      if(err){
                		spinner.fail()
                		console.log(symbols.error, chalk.red('项目创建失败'))
                		console.log(symbols.error, chalk.red(err))
                      }else{
                		spinner.succeed()
                        console.log(symbols.success, chalk.green('项目已创建\n'))
                        console.log(`cd ./${name}\n`)
                        switch (+choose.template) {
                            case 1:
                                console.log(' npm install\n &&\n npm start')
                                break
                            case 2:
                                console.log(' npm install\n &&\n npm run dev\n &&\n npm run server')
                                break
                            case 3:
                                console.log(' npm install\n &&\n npm start')
                                break
                        }
                      }
                  })
            })
       })
program.parse(process.argv)