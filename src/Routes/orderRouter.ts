import express from "express";
import OrderController from "../Controller/Order/OrderController";

//Criação de uma rota para order
export const orderRouter = express.Router();

//Conexão com a camada controller para receber as informações do usuário
const orderController = new OrderController();

//endpoints
orderRouter.post("/create", orderController.createOrder)
orderRouter.put("/update", orderController.updateOrder)
orderRouter.delete("/delete", orderController.deleteOrder)
orderRouter.get("/", orderController.getOrders)
