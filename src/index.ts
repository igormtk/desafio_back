import { app } from "./Data/app";
import { orderRouter } from "./Routes/orderRouter";
import { userRouter } from "./Routes/userRouter";

app.use("/user", userRouter)
app.use("/order", orderRouter)