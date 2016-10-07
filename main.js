require("global-console-prefix")("[PREFIX_RENAME]");

console.log("renaming files...")

const commandLineArgs = require("command-line-args")

const optionDefinitions = [
    { name: "dir", alias: 'd', type: String, multiple: true },
    { name: "prefix", alias: 'p', type: String, multiple: true }
]

const options = commandLineArgs(optionDefinitions)

console.log(options)
