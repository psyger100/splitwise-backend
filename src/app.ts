import express from "express";
import cors from "cors";
import routerV1 from "./routerV1";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
    }),
);
app.use("/api/V1", routerV1);

export default app;
