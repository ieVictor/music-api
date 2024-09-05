const { Router } = require("express");
const UserController = require("../controllers/userController");
const router = Router();

router.get('/', UserController.getUsers);
router.put('/:userId', UserController.updateUser);
router.post('/', UserController.createUser);
router.delete('/:userId', UserController.deleteUser);

module.exports = router