
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const hasedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = {
            ...req.body,
            password: hasedPassword,
        };
        await User.create(userData);
        return res.status(201).json({ message: 'ユーザー登録成功' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ユーザー登録失敗' });
    }
};

exports.login = async (req, res) => {
    try {
        const savedUserData = await User.findOne({ email: req.body.email });
        if (savedUserData) {
            const passwordValid = await bcrypt.compare(req.body.password, savedUserData.password);
            if (passwordValid) {
                const secretKey = process.env.TOKEN_SECRET_KEY;
                const payload = {
                    email: req.body.email,
                };
                const token = jwt.sign(payload, secretKey, {
                    algorithm: 'HS256',
                    expiresIn: '1d',
                });
                return res.status(200).json({ message: 'ログイン成功', token: token });
            } else {
                return res.status(500).json({ message: 'ログイン失敗: パスワードが無効です' });
            }
        } else {
            return res.status(500).json({ message: 'ログイン失敗: ユーザー名が無効です' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ログイン失敗' });
    }
};