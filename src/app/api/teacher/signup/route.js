import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/_config/connect";
import teacherModel from "@/_models/teacherModel";

export const POST = async (request) => {
    connectDB();
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid Email!", status: 0 })
        }
        const isEmailExist = await teacherModel.findOne({ email: email });
        if (isEmailExist) {
            return NextResponse.json({ message: "Teacher already exist.", status: 0 })
        }

        const hassedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new teacherModel({ name, email, password: hassedPassword });
        await newTeacher.save();
        return NextResponse.json({ message: "Teacher registered successfully.", status: 1 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}