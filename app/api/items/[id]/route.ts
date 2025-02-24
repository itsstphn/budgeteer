import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("budgeteer-dev");
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const item = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });

    return NextResponse.json(item);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("budgeteer-dev");
    const id = params.id;
    const body = await request.json();

    console.log("request put", id, body);

    const result = await db
      .collection("items")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Item not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item updated successfully",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}
