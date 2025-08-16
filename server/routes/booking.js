const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const router = express.Router()

router.post('/', (req, res) => {
  const { propertyId, total, fromDate, toDate } = req.body
  const sql = `INSERT INTO bookings(userId,propertyId,fromDate,toDate,total)
    VALUES (?,?,?,?,?)`
  pool.query(
    sql,
    [req.headers.userId, propertyId, fromDate, toDate, total],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

router.get('/', (req, res) => {
  const sql = `
    select 
        b.id, b.fromDate, b.toDate, b.total, b.createdTimestamp, p.title, p.profileImage 
    from bookings b, property p
    WHERE b.userId = ? and b.propertyId = p.id`
  pool.query(sql, [req.headers.userId], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

module.exports = router
