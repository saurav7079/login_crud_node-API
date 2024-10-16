const express = require("express")
const router = express.Router()
const { login, signup, logout, getAllUsers, getUserById } = require("../controller/user.controller")

router.post ('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/users', getAllUsers)
router.get('/user/:id', getUserById)

module.exports = router