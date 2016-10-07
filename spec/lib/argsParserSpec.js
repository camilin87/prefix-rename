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
            dirs: [ 'dir1', 'a second dir' ],
            prefixes: [ 'prefix1', 'second prefix' ]
        }

        parser.parse().then(value => {
            expect(parsedOptions).toEqual([
                { name: "dirs", alias: 'd', type: String, multiple: true },
                { name: "prefixes", alias: 'p', type: String, multiple: true }
            ])
            expect(value).toEqual(seededParseResult)
            done()
        })
    })

    it ("fails when the dirs were not specified", done => {
        seededParseResult = {
            dirs: [],
            prefixes: ["p1"]
        }

        parser.parse().then(null, err => {
            done()
        })
    })

    it ("fails when the prefixes were not specified", done => {
        seededParseResult = {
            dirs: ["d1"],
            prefixes: []
        }

        parser.parse().then(null, err => {
            done()
        })
    })
})