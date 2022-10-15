module.exports = (result, req, res) => {
    if (result.success === false) {
        return res.status(result.status ? result.status : 400).json(result)
    }
    return res.status(200).json(result)
}