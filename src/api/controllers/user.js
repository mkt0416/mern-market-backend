
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const password = req.body.password;
    try {
        // パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            ...req.body,
            password: hashedPassword,
        };
        await UserModel.create(userData);
        return res.status(201).json({ message: 'ユーザー登録成功' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ユーザー登録失敗' });
    }
};

exports.login = async (req, res) => {
    const { password, email } = req.body;
    try {
        // メールアドレスからユーザーを探す
        const savedUserData = await UserModel.findOne({ email: email });
        if (savedUserData) {
            // パスワードの比較
            const passwordValid = await bcrypt.compare(password, savedUserData.password);
            if (passwordValid) {
                const payload = {
                    email: email,
                };
                const secretKey = process.env.TOKEN_SECRET_KEY;
                // jwtの発行
                const token = jwt.sign(payload, secretKey, {
                    algorithm: 'HS256',
                    expiresIn: '1d',
                });
                return res.status(200).json({ message: 'ログイン成功', token: token });
            } else {
                return res.status(400).json({ message: 'ログイン失敗:パスワードが無効です' });
            }
        } else {
            return res.status(400).json({ message: 'ログイン失敗:メールアドレスが無効です' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ログイン失敗' });
    }
};