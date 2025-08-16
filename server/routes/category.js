const express = require('express')
const multer = require('multer')
const fs = require('fs')

const pool = require('../db/db')
const result = require('../utils/result')
const router = express.Router()
const upload = multer({ dest: 'images/' })

router.post('/', upload.single('icon'), (req, res) => {
  const newFileName = req.file.filename + '.jpg'
  fs.rename(req.file.path, `${req.file.destination}${newFileName}`, (err) => {})
  const { title, details } = req.body
  const sql = `INSERT INTO category(title,details,image) VALUES(?,?,?)`
  pool.query(sql, [title, details, newFileName], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

router.get('/', (req, res) => {
  const sql = `SELECT id, title, image FROM category`
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data))
  })
})
module.exports = router
