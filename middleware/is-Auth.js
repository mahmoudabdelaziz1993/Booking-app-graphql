const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        
        let token = req.get('Authorization')
        if (!token) {
            throw Error('unauthorized')
        }

        // remove Beerer section form token 
        token = token.split(' ')[1]
        if (!token || !token.length) {
            throw Error('unauthorized')
        }



        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SEC)
        if (!decodedToken) throw Error('unauthorized')
        req.isAuth = true
        req.user = decodedToken.id
        return next()
    } catch (error) {
        req.isAuth = false
        return next()
    }



}