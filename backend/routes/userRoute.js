const express =require("express")
const router = express.Router();
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getCurrentUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUserDetails, updateUser, deleteUser} = require("../controllers/userController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/logout").get(logoutUser)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getCurrentUserDetails)
router.route("/password/update").put(isAuthenticatedUser ,updatePassword)
router.route("/me/update").put(isAuthenticatedUser ,updateProfile)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers )
router.route("/admin/users/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUserDetails ).put(isAuthenticatedUser,authorizeRoles("admin"),updateUser).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)




module.exports = router;



