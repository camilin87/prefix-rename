var singleFileMover = require("./singleFileMover")
var dummyFileMover = require("./dummyFileMover")

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