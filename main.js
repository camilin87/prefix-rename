require("global-console-prefix")("[PREFIX_RENAME]");

console.log("renaming files...")

var commandLineArgs = require("command-line-args")

var optionDefinitions = [
    { name: "dirs", alias: 'd', type: String, multiple: true },
    { name: "prefixes", alias: 'p', type: String, multiple: true }
]

var options = commandLineArgs(optionDefinitions)

console.log(options)
