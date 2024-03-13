import express from "express";
import cors from "cors";
import routerV1 from "./routerV1";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "*",
    }),
);
app.use("/api/V1",routerV1);

export default app;
