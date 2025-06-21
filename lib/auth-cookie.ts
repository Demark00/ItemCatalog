import {serialize} from "cookie";

export function setAuthCookie(token: string){
    return serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path:'/',
        maxAge: 60 * 60 * 24
    });
}