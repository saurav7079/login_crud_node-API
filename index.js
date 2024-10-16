require("dotenv").config()
require("./util/db")

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

const app = express()
app.listen(8080)

const authRouter = require("./routes/auth.route")
const productRouter = require("./routes/product.route")

app.use(cors({
    origin: "*",
    credentials: "true"
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('/product', productRouter)

