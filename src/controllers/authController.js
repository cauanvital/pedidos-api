import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/UserModel.js';

export const authController = {

    // POST /auth/register
    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are mandatory." });
            }

            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(409).json({ error: "User already exists." });
            }

            // Encrypt the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await UserModel.create(username, hashedPassword);

            res.status(201).json({ message: "User created successfully." });
        } catch (error) {
            res.status(500).json({ error: "Failed to create user." });
        }
    },

    // POST /auth/login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            // Verify if the password matchs the hash on database
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token expire ein 1 hour
            );

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: "Failed to login." });
        }
    }

};