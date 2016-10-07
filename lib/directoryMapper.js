var promise = require("the-promise-factory")

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

                    fulfill(files || [])
                })
            })
        }
    }
}