import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

export function signToken(payload: object){
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string){
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, JWT_SECRET)
}