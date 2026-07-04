import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post('/checkout',auth(UserRole.ADMIN,UserRole.USER, UserRole.AUTHOR) ,subscriptionController.createCheckOutSesssion )
export const subscriptionRoutes = router