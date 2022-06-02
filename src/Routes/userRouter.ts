import express from "express";
import UserController from "../Controller/User/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/create", userController.createUser)
userRouter.put("/update", userController.updateUser)
userRouter.delete("/delete", userController.deleteUser)
userRouter.get("/", userController.getUsers)