import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { verify } from "crypto";

export async function getUserFromCookie() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token) return null;

    try{
        const decoded = verifyToken(token) as { userId: string };
        return decoded;
    }catch(error){
        console.error("Error decoding token:", error);
        return null;
    }
}