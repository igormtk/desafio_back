import express from "express";
import OrderController from "../Controller/Order/OrderController";
import UserController from "../Controller/User/UserController";

//Criação de uma rota para order
export const orderRouter = express.Router();

//Conexão com a camada controller para receber as informações do usuário
const orderController = new OrderController();

//endpoints
orderRouter.post("/create", orderController.createOrder)
