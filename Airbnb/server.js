const express = require("express")
const jwt = require("jsonwebtoken")
const config = require("./config")
const utils  = require("./utils")
const cors = require("cors")

// adding routes
const userRouter = require("./routes/user")
const propertyRouter = require("./routes/property")
const bookingRouter = require("./routes/booking")
// const adminRouter = require("./routes/admin")
// const imageRouter = require("./routes/image")
const categoryRouter = require("./routes/category")


const app = express()

app.use(cors())
app.use(express.json())

app.use((req,res,next) => {
    if(req.url === "/user/login" || req.url === "/user/register"){
        console.log("No token required")
        next()
    } else {
        const token = req.headers.token
        if(token){
            try {
                const payload = jwt.verify(token, config.secret)
                req.userid = payload['id']
                next()
            } catch (error) {
                res.send(utils.createErrorResult('Token is Invalid'))
            }
        }
        else
            res.send(utils.createErrorResult('Token is Missing'))
        }
    })



app.use("/user", userRouter)
app.use("/property", propertyRouter)
app.use("/booking", bookingRouter)
// app.use("/admin", adminRouter)
// app.use("/image", imageRouter)
app.use("/category", categoryRouter)


app.listen(4000,"localhost", () => {
    console.log("Server is running on port 4000")
})