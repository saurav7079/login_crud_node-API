const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = require("../model/user.model")

const signup = async (req, res)=>{
    try {
        const user = new UserSchema(req.body)
        await user.save()
        user.password = undefined
        res.json(user)
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserSchema.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const session = await bcrypt.compare(password, user.password)
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "password incorrect"
            })
        }

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }

        const accessToken = jwt.sign(payload, process.env.AUTH_ACCESS_TOKEN)
        const refreshToken = jwt.sign(payload, process.env.AUTH_REFRESH_TOKEN)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            domain: 'localhost',
            maxAge: 10*60*1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            domain: 'localhost',
            maxAge: 10*60*1000
        })
        res.json({ success: true })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const logout = (req, res) => {
    try {
        // Clear the cookies for accessToken and refreshToken
        res.clearCookie('accessToken', { domain: 'localhost' });
        res.clearCookie('refreshToken', { domain: 'localhost' });

        res.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find()
       
        users.forEach(user => {
            user.password = undefined
        });
        res.json({
            success: true,
            users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserSchema.findById(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.password = undefined;
        res.json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



module.exports = { signup, login, logout, getUserById, getAllUsers };
