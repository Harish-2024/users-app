import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();
        if (!data.user || !data.email || !data.mobile || !data.age || !data.interest) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectMongoDB();
        const user = await User.create(data);
        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();
        const users = await User.find();
        if (!users) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, ...data } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }
        await connectMongoDB();
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User updated successfully", updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id")
        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }
        await connectMongoDB();
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting user", error: error.message }, { status: 500 });
    }
}
