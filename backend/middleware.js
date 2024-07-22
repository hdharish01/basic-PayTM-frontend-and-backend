const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const tokenWithBearer = req.headers.authorization;
    if(!tokenWithBearer || !tokenWithBearer.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const words = tokenWithBearer.split(" ");
    const token = words[1];
    try{
        const verified = jwt.verify(token, JWT_SECRET);
        if(verified.userId){
            req.userId = verified.userId;
            next();
        }else{
            res.status(403).json({})
        }
    }catch(e){
        res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}