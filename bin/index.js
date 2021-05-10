#! /usr/bin/env node
const program = require('commander')
const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const inquirer = require('inquirer')
const version = require('../package.json').version
const templateMaps = require('../template.json')
const handlebars = require('./handlebars')
const spinner = ora('正在下载模板...')

program.version(version, '-v, --version')
       .command('init [name]')
       .action((name) => {
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: '项目名称',
                    default: name,
                    validate (val) {
                        if ((/[\w-]/g).test(val)) {
                            return true
                        }
                        return '请输入项目名称，例如：react-ts-project'
                    }
                },
                {
                    type: 'input',
                    name: 'version',
                    message: '项目版本?',
                    default: '1.0.0'
                },
                {
                    type: 'input',
                    name: 'author',
                    message: '作者?',
                    default: ''
                },
                {
                    type: 'input',
                    name: 'description',
                    message: '项目描述?',
                    default: 'This is a NodeJS project.'
                },
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
                        },
                        {
                            name: '基于rollup的vue3.0组件库模板',
                            value: '4'
                        }
                    ]
                }
            ])
            .then(answers => {
                  spinner.start()
                  download(templateMaps[answers.template], answers.name, {clone: true}, (err) => {
                      if(err){
                		spinner.fail()
                		console.log(symbols.error, chalk.red('项目创建失败'))
                		console.log(symbols.error, chalk.red(err))
                      }else{
                        handlebars(answers)
                		spinner.succeed()
                        console.log(symbols.success, chalk.green('项目已创建\n'))
                        console.log(`cd ./${name}\n`)
                        switch (+answers.template) {
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