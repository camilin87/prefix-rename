var promise = require("the-promise-factory")

module.exports = (fsModule) => {
    return {
        getFiles: (directory) => {
            return promise.create((fulfill, reject) => {
                fsModule.readdir(directory, (err, files) => {
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