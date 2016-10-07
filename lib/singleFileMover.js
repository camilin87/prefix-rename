var promise = require("the-promise-factory")

module.exports = (fs, path) => {

    if (!path){
        path = require("path")
    }

    return {
        move: (directory, inputFilename, outputFilename) => {
            return promise.create((fulfill, reject) => {
                console.log(
                    "MoveFile",
                    "Debug", false,
                    "Directory", directory,
                    "InputFilename", inputFilename,
                    "OutputFilename", outputFilename
                )

                fs.rename(
                    path.join(directory, inputFilename),
                    path.join(directory, outputFilename),
                    (err) => {
                        if (err){
                            reject(err)
                            return
                        }

                        fulfill()
                    }
                )
            })
        }
    }
}