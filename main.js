require("global-console-prefix")("[PREFIX_RENAME]");

const rfr = require("rfr")
const parser = rfr("lib/argsParser")()
const fs = require("fs")

console.log("renaming files...")

parser.parse().then(
    options => {
        console.log(options)

        fs.readdir(options.dir, (err, files) => {
            if (err){
                console.error(err, err.stack)
                process.exit(1)
                return
            }

            console.log("Files")
            files.forEach(f => {
                console.log(f)
            })

            process.exit(0)
        })
    }, err => {
        console.error(err, err.stack)
        process.exit(1)
    })
