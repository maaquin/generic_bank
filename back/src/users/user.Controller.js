import User from '../users/user.model.js'
import bcryptjs from 'bcryptjs'

export const getUserHome = async (req, res) => {
    try {
        const { userId } = req.body

        console.log(userId)

        const userData = await User.findById(userId)

        return res.status(200).json({
            id: userData.id,
            username: userData.username
        })
    } catch (e) {
        return res.status(500).send('Something went wrong')
    }
}