# Deno-cli

## Install
With NPM:
```bash
npm install -g deno-cli
```
With Yarn:
```bash
yarn global add deno-cli
```
## Commands
```bash
..>dm --help
Usage: index [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init            Initiate a deno project
  run             Run your deno project
  help [command]  display help for command
  ```

## `init`
Create a workspace with two files: index.ts and config.json.
```
...>dm init
Creating index file and deno run config...
success Saved config file.
success Saved index file.
```

### Config.json contains the following fields:
```json
{
    "name":"",
    "version":"1.0.0",
    "main" : "index.ts",
    "permissions":[
        "--allow-net"
        ],
    "author" : "",
}
```
In this file you should add all the permissions that you need.

### Index.ts
```typescript
console.log("Hello world!");
```

## `run`
Run the main file for your deno project based on the permissions at `config.json`
```bash
...>dm run
Executing: deno run --allow-net index.ts
Hello world!
```