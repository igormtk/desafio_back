import express from "express";
import UserController from "../Controller/User/UserController";

//Criação de uma rota para usuários
export const userRouter = express.Router();

//Conexão com a camada controller para receber as informações do usuário
const userController = new UserController();

//endpoints
userRouter.post("/create", userController.createUser)
userRouter.put("/update", userController.updateUser)
userRouter.delete("/delete", userController.deleteUser)
userRouter.get("/", userController.getUsers)