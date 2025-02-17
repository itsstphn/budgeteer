import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;

    const db = client.db("budgeteer-dev");

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const month = searchParams.get("month");
    const week = searchParams.get("week");

    console.log("queries from route", type, month, week);

    const items = await db
      .collection("items")
      .find({
        type: type,
        $or: [
          {
            "selectedPeriod.selectedMonth": month,
            "selectedPeriod.selectedWeek": week,
          },
          {
            recurring: "on",
          },
        ],
      })
      .toArray();

    console.log("items", items);

    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("body", body);

    const client = await clientPromise;

    const db = client.db("budgeteer-dev");

    const newItem = {
      ...body,
      created_at: new Date(),
    };

    const result = await db.collection("items").insertOne(newItem);

    console.log("result", result);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}
