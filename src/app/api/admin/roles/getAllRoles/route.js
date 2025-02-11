import roleModel from "@/_models/roleModel";
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const data = await roleModel.find({});
        if (!data) {
            return res.json({ message: "Unable to get data", status: 0 });
        }

        return NextResponse.json({ message: "Get data successfully", status: 1, data: data });
    } catch (err) {
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}