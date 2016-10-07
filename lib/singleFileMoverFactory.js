var rfr = require("rfr")
var singleFileMover = rfr("lib/singleFileMover")
var dummyFileMover = rfr("lib/dummyFileMover")

module.exports = (fs) => {
    if (!fs){
        fs = require("fs")
    }

    return {
        create: isDebug => {
            var fileMoverFn = singleFileMover
            if (isDebug){
                fileMoverFn = dummyFileMover
            }

            return fileMoverFn(fs)
        }
    }
}