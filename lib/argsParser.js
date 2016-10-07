var promise = require("the-promise-factory")

module.exports = (commandLineArgs) => {

    if (!commandLineArgs){
        commandLineArgs = require("command-line-args")
    }

    return {
        parse: () => {
            return promise.create((fulfill, reject) => {
                var optionDefinitions = [
                    { name: "debug", type: Boolean },
                    { name: "dir", alias: 'd', type: String},
                    { name: "prefix", alias: 'p', type: String},
                    { name: "rename", alias: 'r', type: String}
                ]

                var options = commandLineArgs(optionDefinitions)

                if ((options.dir || "").length === 0){
                    reject(new Error("No dir specified"))
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