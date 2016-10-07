require("global-console-prefix")("[PREFIX_RENAME]");

const rfr = require("rfr")
const parser = rfr("lib/argsParser")()
const mapper = rfr("lib/directoryMapper")()

console.log("renaming files...")

parser.parse().then(
    options => {
        console.log(options)

        mapper.getFiles(options.dir).then(
            files => {

                console.log("Files")
                files.forEach(f => {
                    console.log(f)
                })

            }, err => {
                console.error(err, err.stack)
                process.exit(1)
            }
        )
    }, err => {
        console.error(err, err.stack)
        process.exit(1)
    })
