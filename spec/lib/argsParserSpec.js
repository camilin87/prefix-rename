var rfr = require("rfr")
var argsParser = rfr("lib/argsParser")

describe("argsParser", () => {
    var parser = null
    var parsedOptions = null
    var seededParseResult = null

    beforeEach(() => {
        parsedOptions = null
        seededParseResult = null
        var commandLineArgsStub = (options) => {
            parsedOptions = options
            return seededParseResult
        }

        parser = argsParser(commandLineArgsStub)
    })

    it("reads the correct options", done => {
        seededParseResult = {
            dir: "dir1",
            prefix: "prefix1",
            rename: "value1"
        }

        parser.parse().then(value => {
            expect(parsedOptions).toEqual([
                { name: "dir", alias: "d", type: String},
                { name: "prefix", alias: "p", type: String },
                { name: "rename", alias: "r", type: String }
            ])
            expect(value).toEqual(seededParseResult)
            done()
        })
    })

    it ("fails when the dir was not specified", done => {
        seededParseResult = {
            dir: "",
            prefix: "p1",
            rename: "value1"
        }

        parser.parse().then(null, err => {
            done()
        })
    })

    it ("fails when the prefix was not specified", done => {
        seededParseResult = {
            dir: "d1",
            prefix: "",
            rename: "value1"
        }

        parser.parse().then(null, err => {
            done()
        })
    })

    it ("fails when the rename parameter was not specified", done => {
        seededParseResult = {
            dir: "d1",
            prefix: "p1",
            rename: ""
        }

        parser.parse().then(null, err => {
            done()
        })
    })
})