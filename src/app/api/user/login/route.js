import connectDB from "@/_config/connect";
import userModel from "@/_models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    connectDB();
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 });
        }

        const isExist = await userModel.findOne({ email });
        if (!isExist) {
            return NextResponse.json({ message: "Invalid credentials!", status: 0 });
        }

        const verifyPassword = await bcrypt.compare(password, isExist.password);

        if (!verifyPassword) {
            return NextResponse.json({ message: "Invalid credentials!", status: 0 });
        }

        return NextResponse.json({ message: "User logged in successfully", staus: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}