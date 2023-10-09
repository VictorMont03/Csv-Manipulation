const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const { Readable } = require('stream');
const readline = require('readline');
const { Op } = require('sequelize');

const multerConfig = multer()

router.get('/api/users', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        const allUsers = await User.findAll();
        res.json(allUsers);
        return;
    } else {
        User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${q}%` } },
                    { city: { [Op.iLike]: `%${q}%` } },
                    { country: { [Op.iLike]: `%${q}%` } },
                    { favorite_sport: { [Op.iLike]: `%${q}%` } },
                ],
            },
        }).then((users) => {
            res.json(users);
        })
    }
})

router.post("/api/files", multerConfig.single("file"), async (req, res) => {
    const { file } = req;
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const usersLine = readline.createInterface({
        input: readableFile
    });

    let firstLine = true;

    usersLine.on('line', async (line) => {
        if (firstLine) {
            firstLine = false;
        } else {
            const lineSplited = line.split(',');

            await User.create({
                name: lineSplited[0],
                city: lineSplited[1],
                country: lineSplited[2],
                favorite_sport: lineSplited[3]
            })
        }
    })

    res.send('User uploaded')
});

module.exports = router;