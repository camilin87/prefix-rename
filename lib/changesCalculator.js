module.exports = () => {
    return {
        getChanges: (prefix, rename, files) => {
            files = files || []
            files = files.map(f => f.toLowerCase())

            prefix = prefix.toLowerCase()
            var prefixLength = prefix.length

            return files
                .filter(f => f.startsWith(prefix))
                .map(f => {
                    return {
                        input: f,
                        output: rename + f.substring(prefixLength)
                    }
                })
        }
    }
}