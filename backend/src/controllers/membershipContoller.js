import {Membership} from "../models/membershipModels.js"

exports.addMembership = async (req, res) => {
    const { userId, type, duration } = req.body;
    try {
        const newMembership = new Membership({ userId, type, duration });
        await newMembership.save();
        res.status(201).json({ message: "Membership added successfully", membership: newMembership });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateMembership = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const membership = await Membership.findByIdAndUpdate(id, updates, { new: true });
        if (!membership) return res.status(404).json({ message: "Membership not found" });
        res.json({ message: "Membership updated successfully", membership });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMasterListOfMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

// Use adminOnly middleware on admin routes, e.g.:
router.post('/add', adminOnly, membershipController.addMembership);