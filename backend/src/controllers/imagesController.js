
module.exports.postImage = (req, res, next) => {
    console.log("Shit is happening")
    console.log(req.file);
    res.send({
        message: "Kuk"
    })
}