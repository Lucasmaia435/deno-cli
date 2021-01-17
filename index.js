#!/usr/bin/env node
const chalk = require("chalk");
const program = require('commander');
const fs = require('fs');
const { exec } = require("child_process");
const { join } = require('path');

const package = require('./package.json');

const configPath = join(process.cwd(),'config.json');
const mainPath = join(process.cwd(),'index.ts');

program.version(package.version);

program
.command('init')
.description('Initiate a deno project')
.action(()=>{
    console.log(chalk.blueBright('Creating index file and deno run config...'));
    fs.writeFileSync(configPath,
`{
    "name":"",
    "author" : "",
    "version":"1.0.0",
    "main" : "index.ts",
    "permissions":["--allow-net"]
}`

);
    console.log(chalk.green('success'),'Saved config file.');

    fs.writeFileSync(mainPath,`console.log("Hello world!");`);

    console.log(chalk.green('success'),'Saved index file.');

});

program
.command('run')
.description('Run your deno project')
.action(() => {
    const config = require(configPath);

    const { main, permissions } = config;
    
    let exe = "deno run ";
    for(p of permissions){
        exe += `${p} `
    }
    exe += main;
    console.log(chalk.blueBright(`Executing: ${exe}`));

   const run = exec(exe);
  
   run.stdout.on('data', (data) => console.log(data));

   run.stderr.on('error', (data) => {
    console.log(chalk.red('[ERROR]:'), data);
   });

});

program.parse(process.argv);
