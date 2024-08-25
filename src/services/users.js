const User = require('../models/users');
const bcrypt = require('bcryptjs');

class UserServise {
    // Create a new user
    static async createUser(req, res) {
        const { name, email, password } = req.body;

        console.log(name, email, password)
        
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                name,
                email,
                password: hashedPassword
            });

            await user.save();

            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    static async getUser(req, res) {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Get all users
    static async getUsers(req, res) {
        try {
            const users = await User.find().select('-password');
            return res.json(users);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = UserServise;
