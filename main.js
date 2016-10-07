require("global-console-prefix")("[PREFIX_RENAME]");

var rfr = require("rfr")
var parser = rfr("lib/argsParser")()

console.log("renaming files...")

parser.parse().then(
    options => {
        console.log(options)
        process.exit(0)
    }, err => {
        console.error(err, err.stack)
        process.exit(1)
    })
