var promise = require("the-promise-factory")

module.exports = (commandLineArgs) => {
    return {
        parse: () => {
            return promise.create((fulfill, reject) => {
                var optionDefinitions = [
                    { name: "dirs", alias: 'd', type: String, multiple: true },
                    { name: "prefixes", alias: 'p', type: String, multiple: true }
                ]

                var options = commandLineArgs(optionDefinitions)

                if ((options.dirs || []).length === 0){
                    reject(new Error("No dirs specified"))
                    return
                }

                fulfill(options)
            })
        }
    }
}