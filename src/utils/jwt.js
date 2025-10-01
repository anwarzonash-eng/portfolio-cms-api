import { Env } from "../config";
import * as jwt from "jsonwebtoken";


export function createToken(user) {

    const expiresIn = 60 * 60 * 24 * 30 * 6; // 6 month
    const secret = Env.JWT_SECRET;
    const dataStoredInToken = {
        _id: user.id,
        tokentype: 1
    };
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn })
    return {
        expiresIn,
        token
    };
}


export async function  verifyToken(token) {

    const secret = Env.JWT_SECRET;
    const user = await jwt.verify(token, secret);
    return user;

}