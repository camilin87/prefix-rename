require("global-console-prefix")("[PREFIX_RENAME]");

console.log("renaming files...")

const commandLineArgs = require("command-line-args")

const optionDefinitions = [
    { name: "dirs", alias: 'd', type: String, multiple: true },
    { name: "prefixes", alias: 'p', type: String, multiple: true }
]

const options = commandLineArgs(optionDefinitions)

console.log(options)
