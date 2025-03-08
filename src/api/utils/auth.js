
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    if (req.method === 'GET') {
        return next();
    }

    const token = await req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'トークンがありません' });
    }

    try {
        const decodedJwt = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.body.email = decodedJwt.email;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'トークンが正しくないので、ログインしてください' });
    }
};

module.exports = auth;