const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    enableUser,
    disableUser,
    getAdminProfile,
    removeDevice,
    adminLogout,
    updateAdminProfile,
    makeAdmin,
    makeUser
} = require('../controllers/userControllers');
const { verifyJWTToken, verifyTokenAndAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllUsers);
router.post('/create', createUser); // Only admins can create users
// router.put('/:id', verifyJWTToken, verifyTokenAndAdmin, updateUser);
router.patch('/:id/enable',verifyJWTToken, verifyTokenAndAdmin, enableUser);

// Route to disable a user
router.patch('/:id/disable',verifyJWTToken, verifyTokenAndAdmin, disableUser);
router.delete('/delete/:id',verifyJWTToken, verifyTokenAndAdmin, deleteUser); // Only admins can delete users
// router.get('/profile', verifyJWTToken, getAdminProfile);
// router.delete('/admin/remove-device/:email/:deviceId', verifyJWTToken, verifyTokenAndAdmin, removeDevice);
// router.put('/admin/update-profile/:id', verifyJWTToken, verifyTokenAndAdmin, updateAdminProfile);
// router.post('/admin/logout', verifyJWTToken, verifyTokenAndAdmin, adminLogout); // Only admins can log out admin
router.patch('/make-admin/:id',verifyJWTToken, verifyTokenAndAdmin, makeAdmin);
router.patch('/make-user/:id',verifyJWTToken, verifyTokenAndAdmin, makeUser); 

module.exports = router;
