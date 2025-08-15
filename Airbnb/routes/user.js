const express = require("express")
const pool = require("../db")
const utils = require("../utils")
const crypto = require("crypto-js")
const jwt  = require("jsonwebtoken")
const config = require("../config")

const router = express.Router()

const app = express()
app.use(express.json())


router.post("/register", (req,res) => {
    
    const {firstName, lastName, email, password, phone} = req.body
    const encryptedPassword = crypto.SHA256(password).toString()
    const sql = "insert into user(firstName, lastName, email, password, phoneNumber) values (?,?,?,?,?)"
    pool.query(sql, [firstName, lastName, email, encryptedPassword, phone], (error,data) => {
        res.send(utils.createResult(error, data))
    })
})


router.post("/login", (req,res) => {
    const {email, password} = req.body
    const encryptedPassword = crypto.SHA256(password).toString()
    const sql = "select id,firstName,lastName,phoneNumber,isDeleted from user where email = ? and password = ?"
    pool.query(sql, [email,encryptedPassword], (error,users) => {
        if(error){
            res.send(utils.createErrorResult(error))
        } else {
            if(users.length == 0) {
                res.send(utils.createErrorResult("user does not exist"))
            } else {
                const user = users[0]
                if(user.isDeleted) {
                    res.send(utils.createErrorResult("your account is closed"))
                } else {
                    const payload = {id: user.id}
                    const token = jwt.sign(payload, config.secret) 
                    const userData = {
                        token: token,
                        name : `${user['firstName']} ${user['lastName']}`
                    }
                    res.send(utils.createSuccessResult(userData))
                }
            }
        }
    })

})


router.get('/profile', (req, res) => {
    const sql = `SELECT firstName,lastName,phoneNumber,email FROM user where id = ?`
    pool.query(sql,[req.userid], (error, data) => {
        res.send(utils.createResult(error, data[0]))
    })
})

router.put("/profile", (req,res) => {
    const {firstName, lastName, phone} = req.body
    const sql = "update user set firstName = ?, lastName = ?, phoneNumber = ? where id = ?"
    pool.query(sql, [firstName, lastName, phone, req.userid], (error,data) => {
        res.send(utils.createResult(error, data))
    })
})


module.exports = router





