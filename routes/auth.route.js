const express = require("express")
const router = express.Router()
const { login, signup, logout, getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/user.controller")

router.post ('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/users', getAllUsers)
router.get('/user/:id', getUserById)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser);

module.exports = router