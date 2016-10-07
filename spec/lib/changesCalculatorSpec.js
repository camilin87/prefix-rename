var rfr = require("rfr")
var changesCalculator = rfr("lib/changesCalculator")

describe("changesCalculator", () => {
    const calculator = changesCalculator()

    it ("returns one change for file that starts with the prefix", () => {
        expect(calculator.getChanges("p1", "hh", [
            "f1aaa",
            "f2aaa",
            "p1aaaa"
        ]).length).toBe(1)
    })

    it ("renames the prefix", () => {
        expect(calculator.getChanges("p1", "h", [
            "p1bbBb",
            "f2aaa",
            "P1aaaa"
        ])).toEqual([
            {input: "p1bbbb", output: "hbbbb"},
            {input: "p1aaaa", output: "haaaa"}
        ])
    })
})