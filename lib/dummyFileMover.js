var promise = require("the-promise-factory")

module.exports = (fs) => {
    return {
        move: (directory, inputFilename, outputFilename) => {
            return promise.create((fulfill, reject) => {
                console.log(
                    "MoveFile",
                    "Debug", true,
                    "Directory", directory,
                    "InputFilename", inputFilename,
                    "OutputFilename", outputFilename
                )

                fulfill()
            })
        }
    }
}