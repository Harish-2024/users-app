import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connectMongoDB();
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "No user found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching user", error: error.message }, { status: 500 });
    }
}