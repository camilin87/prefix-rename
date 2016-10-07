require("global-console-prefix")("[PREFIX_RENAME]");

const rfr = require("rfr")
const parser = rfr("lib/argsParser")()
const mapper = rfr("lib/directoryMapper")()
const changesCalculator = rfr("lib/changesCalculator")()
const singleFileMoverFactory = rfr("lib/singleFileMoverFactory")()
const fileMoverFactory = rfr("lib/fileMover")

console.log("renaming files...")

parser.parse().then(
    options => {
        console.log("Arguments", options)

        var singleFileMover = singleFileMoverFactory.create(options.debug)
        var fileMover = fileMoverFactory(singleFileMover)

        mapper.getFiles(options.dir).then(
            files => {

                var renameOperations = changesCalculator.getChanges(
                    options.prefix, options.rename, files
                )

                fileMover
                    .move(options.dir, renameOperations)
                    .then(() => {
                        console.log("files renamed successfully")
                    }, err => {
                        console.error(err, err.stack)
                        process.exit(1)
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
