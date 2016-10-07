var async = require("async")
var promise = require("the-promise-factory")

module.exports = (parser, singleFileMoverFactory, fileMoverFactory, changesCalculator, mapper) => {
    return {
        run: () => {
            return promise.create((fulfill, reject) => {
                async.waterfall([
                    initData,
                    readArguments,
                    createFileMover,
                    readFiles,
                    readRenameOperations,
                    moveFiles
                ], (err) => {
                    if (err) {
                        reject(err)
                        return
                    }

                    fulfill()
                })
            });
        }
    }

    function initData(callback){
        callback(null, {
            options: null,
            fileMover: null,
            files: null,
            renameOperations: null
        })
    }

    function readArguments(data, callback){
        parser
            .parse()
            .then(options => {
                console.log("Arguments", options)

                data.options = options
                callback(null, data)
            }, callback)
    }

    function createFileMover(data, callback){
        var singleFileMover = singleFileMoverFactory.create(data.options.debug)
        var fileMover = fileMoverFactory(singleFileMover)
        data.fileMover = fileMover
        callback(null, data)
    }

    function readFiles(data, callback){
        mapper.getFiles(data.options.dir).then(
            files => {
                data.files = files
                callback(null, data)
            }, callback)
    }

    function readRenameOperations(data, callback){
        var renameOperations = changesCalculator.getChanges(
            data.options.prefix, data.options.rename, data.files
        )
        data.renameOperations = renameOperations
        callback(null, data)
    }

    function moveFiles(data, callback){
        data.fileMover
            .move(data.options.dir, data.renameOperations)
            .then(() => {
                callback(null)
            }, callback)
    }
}