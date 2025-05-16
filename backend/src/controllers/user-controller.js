import User from "../models/user-model.js"

const addUser = async (req, res) => {
    const { userName, email, mobile, age, interests } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const newUser = new User({ userName, email, age, mobile, interests })

        if (newUser) {
            await newUser.save()
            return res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                age: newUser.age,
                mobile: newUser.mobile,
                interests: newUser.interests
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const { userName, email, age, mobile, interests } = req.body

        const updates = {}

        if (userName) updates.userName = userName
        if (email) updates.email = email
        if (age) updates.age = age
        if (mobile) updates.mobile = mobile
        if (interests) updates.interests = interests

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        )

        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export default {
    addUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser
}