import { Request, Response, Router } from "express";
import { asyncCatch } from "../utils/catchAsyncWrapper";
import { UserManager } from "./user.manager";

export class userController {
    public router = Router();

    private _userManager: UserManager = new UserManager();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post("/signin", asyncCatch(this.createUser.bind(this)));
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
}
