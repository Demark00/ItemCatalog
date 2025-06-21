import { connectToDB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { signToken } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/auth-cookie";
import User from "@/models/user.model";
import argon2 from "argon2";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user || !(await argon2.verify(user.password, password))) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = signToken({ userId: user._id });

        const cookie = setAuthCookie(token);

        return new NextResponse(JSON.stringify({ message: "Login Successful" }), {
            status: 200,
            headers: { "Set-Cookie": cookie },
        });

    } catch (error) {
        console.error("Error in login route:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}