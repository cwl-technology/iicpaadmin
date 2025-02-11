import connectDB from "@/_config/connect";
import menuModel from "@/_models/menuModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    connectDB();
    try {
        const data = await menuModel.find();
        if (!data) {
            return NextResponse.json({ message: "Unable to get data", status: 0 });
        }
        return NextResponse.json({ message: "Get data successfully...", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}