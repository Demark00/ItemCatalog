import  { NextRequest,NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { connectToDB } from "@/lib/db";
import User from "@/models/user.model";
import { cookies } from "next/headers";

export async function GET(req: NextRequest){
    try{
        await connectToDB();

        const token = (await cookies()).get("token")?.value;

        if(!token){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        };

        const decoded = verifyToken(token) as { userId: string };

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    }catch(error){
        console.error("Error in checkAuth route:", error);
        return NextResponse.json({ error: "Invalid token or user" }, { status: 401 });
    }
}
