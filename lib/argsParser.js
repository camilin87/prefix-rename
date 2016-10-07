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
                    { name: "prefix", alias: 'p', type: String}
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

                fulfill(options)
            })
        }
    }
}