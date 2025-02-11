import connectDB from "@/_config/connect";
import adminModel from "@/_models/adminModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    connectDB();
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 });
        }

        const isExist = await adminModel.findOne({ email });
        if (!isExist) {
            return NextResponse.json({ messag: "Invalid credentials!", status: 0 });
        }
        const comparePassword = await bcrypt.compare(password, isExist.password);
        if (!comparePassword) {
            return NextResponse.json({ message: "Invalid credentials!", status: 0 })
        }

        return NextResponse.json({ messag: "Admin logged in successfully", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}