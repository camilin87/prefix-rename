var rfr = require("rfr")
var directoryMapper = rfr("lib/directoryMapper")

describe("directoryMapper", () => {
    var mapper = null

    var seededFiles = null
    var seededError = null
    var mappedDirectory = null

    beforeEach(() => {
        seededFiles = null
        seededError = null
        mappedDirectory = null

        var fsStub = {
            readdir: (dir, callback) => {
                mappedDirectory = dir
                callback(seededError, seededFiles)
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
})