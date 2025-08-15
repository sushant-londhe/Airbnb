const express = require("express")
const pool = require("../db")
const utils = require("../utils")
const router = express.Router()


router.get("/", (req,res) => {
    const sql = `select * from bookings`
    pool.query(sql,(error,data) => {
        res.send((utils.createResult(error,data)))
    })

})


router.post("/", (req,res) => {
    const {propertyId,fromDate,toDate,total} = req.body
    const sql = "insert into bookings(userId,propertyId,fromDate,toDate,total) values (?,?,?,?,?)"
    pool.query(sql, [req.userid,propertyId,fromDate,toDate,total] ,(error,data) => {
        res.send(utils.createResult(error, data))
    })
})

module.exports = router