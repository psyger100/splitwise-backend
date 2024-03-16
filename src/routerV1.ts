import { Router } from "express";
import { userController } from "./user/user.controller";
import { verifyJWT } from "./utils/middlewares";

const routerV1 = Router();

const routes = [
    {
        path: "/user",
        route: new userController().router,
    },
];

routes.forEach((route) => {
    routerV1.use(route.path, route.route);
});
export default routerV1;
