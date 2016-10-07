require("global-console-prefix")("[PREFIX_RENAME]");

const rfr = require("rfr")
const parser = rfr("lib/argsParser")()
const mapper = rfr("lib/directoryMapper")()
const changesCalculator = rfr("lib/changesCalculator")()
const singleFileMoverFactory = rfr("lib/singleFileMoverFactory")()

console.log("renaming files...")

parser.parse().then(
    options => {
        console.log(options)

        var singleFileMover = singleFileMoverFactory.create(options.debug)

        mapper.getFiles(options.dir).then(
            files => {

                // console.log("Files")
                // files.forEach(f => {
                //     console.log(f)
                // })

                var renameOperations = changesCalculator.getChanges(
                    options.prefix, options.rename, files
                )

                // console.log("Operations")
                renameOperations.forEach(o => {
                    // console.log(o)
                    singleFileMover
                        .move(options.dir, o.input, o.output)
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
