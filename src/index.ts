import { app } from "./Data/app";
import { userRouter } from "./Routes/userRouter";

app.use("/user", userRouter)