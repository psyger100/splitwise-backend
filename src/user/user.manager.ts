import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshTokens";
import { user } from "../utils/prisma";
import bcrypt from "bcrypt";

export class UserManager {
    constructor() {}

    public async signIn(email: string, password: string, name: string) {
        const isunique = await user.findUnique({
            where: {
                email: email,
            },
        });
        if (isunique == null) {
            const userdests = {
                name: name,
                password: await bcrypt.hash(password, 10),
                email: email,
            };
            await user.create({
                data: userdests,
            });
            delete (userdests as { password?: string }).password;
            return userdests;
        } else {
            return null;
        }
    }
    public async logIn(email: string, password: string) {
        const userdests = await user.findUnique({
            where: {
                email: email,
            },
        });
        if (userdests != null) {
            const isvalid = await bcrypt.compare(password, userdests.password);
            if (isvalid) {
                delete (userdests as { password?: string }).password;
                const { accessToken, refreshToken }: any =
                    await generateAccessAndRefreshToken(userdests);
                await user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        refreshToken: refreshToken,
                    },
                });
                return { accessToken, refreshToken };
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public async logout(current_user: any) {
        await user.update({
            where: {
                email: current_user.email,
            },
            data: {
                refreshToken: "",
            },
        });
    }
}
