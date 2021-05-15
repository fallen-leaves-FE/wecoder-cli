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
const install = require('./install')
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
                    default: '大帅比'
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
                },
                {
                    type: 'list',
                    name: 'installName',
                    message: '安装依赖',
                    default: 'npm',
                    choices: [
                        {
                            name: 'npm',
                            value: 'npm install'
                        },
                        {
                            name: 'cnpm',
                            value: 'cnpm install'
                        },
                        {
                            name: 'yarn',
                            value: 'yarn'
                        },
                        {
                            name: '手动安装',
                            value: null
                        }
                    ]
                }
            ])
            .then(answers => {
                  spinner.start()
                  download(templateMaps[answers.template], answers.projectName, {clone: true},(err) => {
                      if(err){
                        spinner.fail()
                        console.log(symbols.error, chalk.red('项目创建失败'))
                        console.log(symbols.error, chalk.red(err))
                      }else{
                        handlebars(answers)
                        spinner.text = '模版下载成功'
                        if (answers.installName) {
                            spinner.text = '安装依赖中...'
                            install(`${answers.projectName}`, `${answers.installName}`)
                            .then(() => {
                                spinner.succeed()
                                console.log(symbols.success, chalk.green('项目初始化成功'))
                            }).catch(err => {
                                spinner.fail()
                                console.log(symbols.error, chalk.red('依赖安装失败，请手动执行安装命令！'))
                                console.log(symbols.error, chalk.red(err))
                            })
                        } else {
                            spinner.succeed()
                            console.log(symbols.success, chalk.green('模版下载成功，请手动安装依赖'))
                        }
                      }
                  })
            })
       })
program.parse(process.argv)