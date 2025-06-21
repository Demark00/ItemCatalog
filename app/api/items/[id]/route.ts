import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item.model";
import { connectToDB } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const item = await Item.findById(params.id).populate("createdBy", "name email");

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/items/[id]:", error);
    return NextResponse.json({ message: "Failed to fetch item" }, { status: 500 });
  }
}
