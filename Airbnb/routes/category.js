const express = require('express')
const multer = require('multer')
const pool = require("../db")
const utils = require("../utils")

const upload = multer({dest: "images"})

const router = express.Router()

router.get('/', (req,res) => {
    const sql = `select id, title, details, image from category`
    pool.query(sql, (error, data) => {
        res.send(utils.createResult(error,data))
    })
})

router.post('/', upload.single('icon'), (req, res) => {
    const { title, details } = req.body
    const sql = `insert into category (title,details,image) values(?,?,?)`
    pool.query(sql, [title, details, req.file.filename], (error, data) => {
        res.send(utils.createResult(error, data))
    })
})


module.exports = router