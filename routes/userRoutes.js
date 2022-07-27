const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userContoller");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

module.exports = router;
