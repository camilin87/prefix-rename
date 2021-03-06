var rfr = require("rfr")
var directoryMapper = rfr("lib/directoryMapper")

describe("directoryMapper", () => {
    var mapper = null

    var seededFiles = null
    var seededError = null
    var mappedDirectory = null

    var seededStatError = null
    var itemsWhoseStatsWereRead = null
    var getStatsCallback = null

    beforeEach(() => {
        seededFiles = null
        seededError = null
        mappedDirectory = null

        seededStatError = null
        itemsWhoseStatsWereRead = []

        getStatsCallback = f => {
            return {
                isFile: () => true
            }
        }
        var fsStub = {
            readdir: (dir, callback) => {
                mappedDirectory = dir
                callback(seededError, seededFiles)
            },
            stat: (file, callback) => {
                itemsWhoseStatsWereRead.push(file)
                callback(seededStatError, getStatsCallback(file))
            }
        }

        mapper = directoryMapper(fsStub)
    })

    it ("reads the correct directory", done => {
        mapper.getFiles("dir1").then(files => {
            expect(mappedDirectory).toBe("dir1")
            done()
        })
    })

    it ("returns an empty array for empty directories", done => {
        mapper.getFiles("dir1").then(files => {
            expect(files).toEqual([])
            done()
        })
    })

    it ("returns the files in the directory", done => {
        seededFiles = ["d1", "d2", "d3"]

        mapper.getFiles("dir1").then(files => {
            expect(files).toEqual(seededFiles)
            done()
        })
    })

    it ("bubbles up errors", done => {
        seededError = "something went wrong"

        mapper.getFiles("dir1").then(null, err => {
            expect(err).toBe("something went wrong")
            done()
        })
    })

    it ("reads the stats for each item", done => {
        seededFiles = ["d1", "d2", "d3"]

        mapper.getFiles("dir1").then(files => {
            expect(itemsWhoseStatsWereRead).toEqual([
                "dir1/d1",
                "dir1/d2",
                "dir1/d3"
            ])
            done()
        })
    })

    it ("fails when stats could not be read", done => {
        seededFiles = ["d1", "d2", "d3"]
        seededStatError = "could not read stats"

        mapper.getFiles("dir1").then(null, err => {
            expect(err).toBe("could not read stats")
            done()
        })
    })

    it ("only returns the files", done => {
        seededFiles = ["d1", "d2", "d3"]
        getStatsCallback = f => {
            if (f === "dir1/d2"){
                return {
                    isFile: () => false
                }
            }

            return {
                isFile: () => true
            }
        }

        mapper.getFiles("dir1").then(files => {
            expect(files).toEqual(["d1", "d3"])
            done()
        })
    })

})