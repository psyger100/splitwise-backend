import { Request, Response, Router } from "express";
import { asyncCatch } from "../utils/catchAsyncWrapper";
import { UserManager } from "./user.manager";
import { verifyJWT } from "../utils/middlewares";

export class userController {
    public router = Router();

    private _userManager: UserManager = new UserManager();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post("/signup", asyncCatch(this.createUser.bind(this)));
        this.router.post("/login", asyncCatch(this.loginUser.bind(this)));
        this.router.post("/logout", verifyJWT, asyncCatch(this.logoutUser.bind(this)));
    }
    public async createUser(req: Request, res: Response) {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.send(400).json({ message: "All fields are required" });
        }
        const myres = await this._userManager.signIn(email, password, name);
        if (myres != null) {
            return res.status(200).json({ user_created: myres });
        } else {
            return res.status(400).json({ message: "Enter Unique Data" });
        }
    }
    public async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const myres = await this._userManager.logIn(email, password);
        if (myres != null) {
            const options = {
                httpOnly: true,
                secure: true,
            };
            return res
                .status(200)
                .cookie("accessToken", myres.accessToken, options)
                .cookie("refreshToken", myres.refreshToken, options)
                .json({ message: "Logged In" });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    public async logoutUser(req: any, res: Response) {
        const currentUser = req.current_user;
        await this._userManager.logout(currentUser);
        const options = { httpOnly: true, secure: true };
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "Logged Out" });
        res.send(200);
    }
}
