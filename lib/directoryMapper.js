var promise = require("the-promise-factory")
var async = require("async")

module.exports = (fs) => {
    if (!fs){
        fs = require("fs")
    }

    return {
        getFiles: (directory) => {
            return promise.create((fulfill, reject) => {
                fs.readdir(directory, (err, files) => {
                    if (err){
                        reject(err)
                        return
                    }

                    files = files || []

                    async.each(files, (f, cb) => {
                        fs.stat(f, (err, stats) => {
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