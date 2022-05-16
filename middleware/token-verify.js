const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const token = req.headers["x-acces-token"] || req.body.token || req.query.token;
    
    if(token) {
        jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
            if(err) {
                res.json({
                    status: false,
                    message: "Kirish muvaffaqiyatsiz token xato"
                })
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    }
    else{
        res.json({
            status: false,
            message: "Bunday token yuq || token topilmadi"
        })
    }
}