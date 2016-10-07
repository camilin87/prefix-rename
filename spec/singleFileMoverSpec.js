var rfr = require("rfr")
var singleFileMover = rfr("lib/singleFileMover")

describe("singleFileMover", () => {
    var fileMover = null

    var seededMoveError = null
    var moveSource = null
    var moveDest = null

    beforeEach(() => {
        seededMoveError = null
        moveSource = null
        moveDest = null

        var fsStub = {
            rename: (oldPath, newPath, callback) => {
                moveSource = oldPath
                moveDest = newPath

                callback(seededMoveError)
            }
        }

        fileMover = singleFileMover(fsStub)

        spyOn(console, "log")
    })

    it ("renames the file", done => {
        fileMover.move("dir1", "f1.txt", "f2.txt").then(() => {
            expect(moveSource).toBe("dir1/f1.txt")
            expect(moveDest).toBe("dir1/f2.txt")
            done()
        })
    })

    it ("bubbles up fs errors", done => {
        seededMoveError = "something went wrong"

        fileMover.move("dir1", "f1.txt", "f2.txt").then(null, err => {
            expect(err).toBe(seededMoveError)
            done()
        })
    })
})