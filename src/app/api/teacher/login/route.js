import connectDB from "@/_config/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import teacherModel from "@/_models/teacherModel";

export const POST = async (request) => {
    connectDB();
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 });
        }

        const isExist = await teacherModel.findOne({ email });
        if (!isExist) {
            return NextResponse.json({ message: "Invalid credentials!", status: 0 });
        }

        const verifyPassword = await bcrypt.compare(password, isExist.password);

        if (!verifyPassword) {
            return NextResponse.json({ message: "Invalid credentials!", status: 0 });
        }

        return NextResponse.json({ message: "Teacher logged in successfully", staus: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}