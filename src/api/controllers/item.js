
const ItemModel = require('../models/item');

exports.create = async (req, res) => {
    try {
        await ItemModel.create(req.body);
        return res.status(201).json({ message: 'アイテム作成成功' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'アイテム作成失敗' });
    }
};

exports.readAll = async (req, res) => {
    try {
        const allItems = await ItemModel.find();
        return res.status(200).json({ message: 'アイテム読み取り成功オール', allItems: allItems });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'アイテム読み取り失敗オール' });
    }
};

exports.readSingle = async (req, res) => {
    const { id } = req.params;
    try {
        const singleItem = await ItemModel.findById(id);
        if (!singleItem) {
            return res.status(404).json({ message: 'ページが存在しません' });
        }
        return res.status(200).json({ message: 'アイテム読み取り成功シングル', singleItem: singleItem });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'アイテム読み取り失敗シングル' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const singleItem = await ItemModel.findById(id);
        if (!singleItem) {
            return res.status(404).json({ message: 'ページが存在しません' });
        }
        if (singleItem.email === req.body.email) {
            await ItemModel.updateOne({ _id: id }, req.body);
            return res.status(200).json({ message: 'アイテム編集成功' });
        } else {
            return res.status(400).json({ message: '他の人が作成したアイテムです' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'アイテム編集失敗' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const singleItem = await ItemModel.findById(id);
        if (!singleItem) {
            return res.status(404).json({ message: 'ページが存在しません' });
        }
        if (singleItem.email === req.body.email) {
            await ItemModel.deleteOne({ _id: id });
            return res.status(200).json({ message: 'アイテム削除成功' });
        } else {
            return res.status(400).json({ message: '他の人が作成したアイテムです' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'アイテム削除失敗' });
    }
};