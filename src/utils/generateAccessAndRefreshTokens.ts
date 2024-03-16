import jwt, { Secret } from "jsonwebtoken";

export const generateAccessAndRefreshToken = async (details: object) => {
    try {
        const accessToken = await jwt.sign(
            details,
            process.env.ACCESS_TOKEN_SECRET as Secret,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            },
        );
        const refreshToken = await jwt.sign(
            details,
            process.env.ACCESS_TOKEN_SECRET as Secret,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            },
        );
        return { accessToken, refreshToken };
    } catch (error) {
        return null;
    }
};
