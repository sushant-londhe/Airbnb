const express = require("express")
const pool = require("../db")
const utils = require("../utils")
const multer = require("multer")

const upload = multer({dest:"images"})

const router = express.Router()



router.get("/", (req,res) => {
    const sql = `select categoryId,title,details,rent,profileImage from property`
    pool.query(sql,(error,data) => {
        res.send(utils.createResult(error,data))
    })
})


router.post("/", (req,res) => {
    const {categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,
        isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent } = req.body
    const sql = "insert into property(categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    pool.query(sql, [categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,
        isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent], (error,data) => {
        res.send(utils.createResult(error, data))
    })
})

router.put("/", (req,res) => {
    const {title,rent,id} = req.body
    const sql = "update property set title=?, rent=? where id=?"
    pool.query(sql, [title,rent,id], (error,data) => {
        res.send(utils.createResult(error, data))
    })
})

router.get("/", (req,res) => {
    const {id} = req.body
    const sql = `select * from property where id=?`
    pool.query(sql,[id],(error,data) => {
        res.send(utils.createResult(error,data))
    })
})

router.put("/image",upload.single("icon"), (req,res) => {
    const {id} = req.body
    const sql = "update property set profileImage = ? where id = ?"
    pool.query(sql,[req.file.filename,id], (error,data) => {
        res.send(utils.createResult(error,data))
    })
})

module.exports = router