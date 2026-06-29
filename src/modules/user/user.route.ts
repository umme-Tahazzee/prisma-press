import { Router } from "express";
import { userController } from "./user.controller.js";




const router = Router()

router.post("/register", userController.registerUser );
router.get("/me", userController.getMyProfile );


export const userRoutes = router