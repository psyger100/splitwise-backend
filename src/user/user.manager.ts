import { user } from "../utils/prisma";

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
                password: password,
                email: email,
            };
            await user.create({
                data: userdests,
            });
            return userdests;
        } else {
            return null;
        }
    }
}
