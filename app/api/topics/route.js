import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {topic, description} = await req.json();
    await connectMongoDB();
    await Topic.create({topic, description});
    return NextResponse.json({message:"done"},{status:201})
}