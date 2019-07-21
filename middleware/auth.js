const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).json({msg: 'No token , autherization denied'});
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid '})
    }
}