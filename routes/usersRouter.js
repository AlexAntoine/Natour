const express = require('express');
const router = express.Router();

const{getAllUsers,createUser,getUser,deleteUser, updateUser} = require('../controllers/usersController');

// USERS
router.route('/')
.get(getAllUsers)
.post(createUser);

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;
