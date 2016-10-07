var promise = require("the-promise-factory")

module.exports = (commandLineArgs) => {

    if (!commandLineArgs){
        commandLineArgs = require("command-line-args")
    }

    return {
        parse: () => {
            return promise.create((fulfill, reject) => {
                var optionDefinitions = [
                    { name: "dirs", alias: 'd', type: String, multiple: true },
                    { name: "prefix", alias: 'p', type: String},
                    { name: "rename", alias: 'r', type: String}
                ]

                var options = commandLineArgs(optionDefinitions)

                if ((options.dirs || []).length === 0){
                    reject(new Error("No dirs specified"))
                    return
                }

                if ((options.prefix || "").length === 0){
                    reject(new Error("No prefix specified"))
                    return
                }

                if ((options.rename || "").length === 0){
                    reject(new Error("No rename specified"))
                    return
                }

                fulfill(options)
            })
        }
    }
}