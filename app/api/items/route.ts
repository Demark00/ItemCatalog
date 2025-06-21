import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item.model";
import { connectToDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();
        const { name, description, type, coverImage, additionalImages } = body;

        if (!name || !type || !coverImage) {
            return NextResponse.json({ message: "Name, type, and cover image are required." }, { status: 400 });
        }

        const uploadCover = await cloudinary.uploader.upload(coverImage, { folder: "cover", timeout: 20000 });

        const uploadAdditionalImages = additionalImages?.length
            ? await Promise.all(
                additionalImages.map((img: string) =>
                    cloudinary.uploader.upload(img, { folder: "additional", timeout:20000 })
                )
            )
            : [];

        const user = await getUserFromCookie();

        const newItem = await Item.create({
            name,
            type,
            description,
            coverImage: uploadCover.secure_url,
            additionalImages: uploadAdditionalImages.map((img) => img.secure_url),
            createdBy: user?.userId || null,
        });

        const itemObj = newItem.toObject();

        return NextResponse.json(
            { message: "Item added successfully", item: itemObj },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error in POST /api/items:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectToDB();

        const items = await Item.find().sort({ createdAt: -1 }).select("name type coverImage createdBy createdAt _id");

        return NextResponse.json({ items }, { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/items:", error);
        return NextResponse.json({ message: "Failed to fetch items" }, { status: 500 });
    }
}
