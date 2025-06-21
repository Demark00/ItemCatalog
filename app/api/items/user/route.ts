import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Item from "@/models/item.model";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function GET(req: NextRequest) {
    try{
        await connectToDB();

        const user = await getUserFromCookie();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const items = await Item.find({ createdBy: user.userId }).sort({ createdAt: -1 });

        return NextResponse.json({ items }, { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/items/user:", error);
        return NextResponse.json({ message: "Failed to fetch user items" }, { status: 500 });
    }
}
