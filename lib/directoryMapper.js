var promise = require("the-promise-factory")
var async = require("async")

module.exports = (fs, path) => {
    if (!fs){
        fs = require("fs")
    }

    if (!path){
        path = require("path")
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
                        var fullPath = path.join(directory, f)
                        fs.stat(fullPath, (err, stats) => {
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