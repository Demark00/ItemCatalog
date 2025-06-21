import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { signToken } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/auth-cookie";
import { connectToDB } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const { fullName, email, password } = await req.json();

        const existing = await User.findOne({ email });

        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashed = await argon2.hash(password);

        const user = await User.create({
            fullName,
            email,
            password: hashed
        });

        const token = signToken({ userId: user._id });

        const cookie = setAuthCookie(token);

        return new NextResponse(JSON.stringify({ message: "Signup Successful" }), {
            status: 201,
            headers: { "Set-Cookie": cookie },
        })
    } catch (error) {
        console.log("Error in signup route:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }));
    }

}