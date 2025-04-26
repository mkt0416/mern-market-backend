
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = await req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'トークンがありません' });
    }

    try {
        const secretKey = process.env.TOKEN_SECRET_KEY;
        const decodedJwt = jwt.verify(token, secretKey);
        console.log(decodedJwt);
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'トークンが正しくないので、ログインしてください' });
    }
};

module.exports = auth;