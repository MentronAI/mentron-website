import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const client = await clientPromise;
    const database = client.db("Mentron");
    const collection = database.collection("institutional-demos");
    
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error saving demo request:", error);
    return NextResponse.json(
      { error: "Failed to save demo request" },
      { status: 500 }
    );
  }
}
