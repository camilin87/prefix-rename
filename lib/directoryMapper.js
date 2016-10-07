var promise = require("the-promise-factory")
var async = require("async")

module.exports = (fs) => {
    if (!fs){
        fs = require("fs")
    }

    return {
        getFiles: (directory) => {
            return promise.create((fulfill, reject) => {
                fs.readdir(directory, (err, directoryItems) => {
                    if (err){
                        reject(err)
                        return
                    }

                    directoryItems = directoryItems || []
                    var files = []

                    async.each(directoryItems, (f, cb) => {
                        fs.stat(f, (err, stats) => {
                            if (!stats.isDirectory()){
                                files.push(f)
                            }
                            cb(err)
                        })
                    }, (err) => {
                        if (err){
                            reject(err)
                            return
                        }

                        fulfill(files)
                    })
                })
            })
        }
    }
}