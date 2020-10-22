const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "D0dKsugPi5r}Viv";
/* GET home page. */
module.exports = function () {
    return (req, res, next) => {
        const header = req.headers['authorization'];
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log('TOKEN-SECRET', TOKEN_SECRET);
            try {
                const decodedToken = jwt.verify(token,
                    TOKEN_SECRET);
                console.log(decodedToken);
                if (!decodedToken) return res.status(401).send({ message: "invalidToken", result: [] })
                if (decodedToken) {
                    req.user=decodedToken
                    next();
                } else {
                    return res.status(401).send({ message: "invalidToken", result: [] })
                }
            } catch (err) {
                console.log(err);
                return res.status(401).send({ message: err.message, result: [] })
            }

        } else {
            //If header is undefined return unAuthorized (401)
            return res.status(401).send({ message: "invalidHeader", result: [] })
        }

    };
};