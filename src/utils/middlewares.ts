import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "./prisma";

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    interface CustomRequest extends Request {
        current_user: any;
    }

    const token = req.cookies?.accessToken || null;
    if (token == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded_value = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
    ) as { email: string };
    const current_user = await user.findUnique({
        where: {
            email: decoded_value.email,
        },
    });

    delete (current_user as { password?: string }).password;
    (req as CustomRequest).current_user = current_user;

    next();
};
