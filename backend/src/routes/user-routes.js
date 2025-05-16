import express from "express"
import authController from "../controllers/user-controller.js"

const router = express.Router()

router.post("/addUser", authController.addUser)

router.put("/update-user/:id", authController.updateUser)

router.get("/all-users", authController.getUsers)

router.get("/:id", authController.getUser)

router.delete("/:id", authController.deleteUser)

export default router