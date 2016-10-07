var async = require("async")
var promise = require("the-promise-factory")

module.exports = (singleFileMover) => {
    return {
        move: (dir, renameOperations) => {
            return promise.create((fulfill, reject) => {
                async.each(renameOperations, (o, cb) => {
                    singleFileMover
                        .move(dir, o.input, o.output)
                        .then(() => {
                            cb(null)
                        }, cb)
                }, err => {
                    if (err){
                        reject(err)
                        return
                    }

                    fulfill()
                })
            })
        }
    }
}