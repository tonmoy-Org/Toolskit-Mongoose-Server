const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const User = require('../models/userSchema');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get admin profile
const getAdminProfile = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json([user]); // Wrap user object in an array
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// update admin profile
const updateAdminProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { displayName, email, bio, photoURL } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { displayName, email, bio, photoURL },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a new user
const createUser = async (req, res) => {
    const { email, password, displayName, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const firebaseUser = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: displayName,
        });

        const newUser = new User({
            email: email,
            displayName: displayName,
            password: hashedPassword,
            firebaseUid: firebaseUser.uid,
            role: role
        });
        console.log(newUser)
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, displayName } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const updateParams = {};
        if (email) updateParams.email = email;
        if (password) updateParams.password = await bcrypt.hash(password, 10);
        if (displayName) updateParams.displayName = displayName;

        await admin.auth().updateUser(user.firebaseUid, updateParams);

        const updatedUser = await User.findByIdAndUpdate(id, updateParams, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await admin.auth().deleteUser(user.firebaseUid);

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Enable user account
const enableUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await admin.auth().updateUser(user.firebaseUid, { disabled: false });

        user.disabled = false;
        await user.save();

        res.status(200).json({ message: "User account enabled." });
    } catch (error) {
        console.error('Error enabling user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Disable user account
const disableUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await admin.auth().updateUser(user.firebaseUid, { disabled: true });

        user.disabled = true;
        await user.save();

        res.status(200).json({ message: "User account disabled." });
    } catch (error) {
        console.error('Error disabling user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Remove device from admin user
const removeDevice = async (req, res) => {
    const { email, deviceId } = req.params;

    try {
        const adminUser = await User.findOne({ email });

        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        adminUser.deviceInfo = adminUser.deviceInfo.filter(device => device.deviceId !== deviceId);
        await adminUser.save();

        res.status(200).json({ message: 'Device removed successfully' });
    } catch (error) {
        console.error('Error removing device:', error);
        res.status(500).json({ message: 'Failed to remove device' });
    }
};


// Make a user an admin
const makeAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'Admin';
        await user.save();

        res.status(200).json({ message: 'User role updated to admin', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Make a user a regular user
const makeUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'user';
        await user.save();

        res.status(200).json({ message: 'User role updated to user', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



module.exports = { getAllUsers, getAdminProfile, createUser, updateUser, deleteUser, enableUser, disableUser, removeDevice, updateAdminProfile, makeAdmin, makeUser };
