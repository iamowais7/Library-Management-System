import {User} from "../models/userModels.js"
import jwt from "jsonwebtoken"

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getHomepage = (req, res) => {
    const { role } = req.user;
    if (role === 'admin') {
        res.json({ message: "Welcome to the Admin Homepage" });
    } else {
        res.json({ message: "Welcome to the User Homepage" });
    }
};