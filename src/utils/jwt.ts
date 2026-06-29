import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const createToken = (
    payload: JwtPayload,
    secret: string,
    expiresIn: SignOptions
) => {
    return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

const verifyToken = (token: string, secret: string) => {
    try {
        const verifyToken = jwt.verify(token, secret) as JwtPayload
        return verifyToken
    } catch (error : any) {
        console.log("token verification failed", error);
        throw new Error(error.message)

    }
}

export const jwtUtils = {
    createToken,
    verifyToken
}