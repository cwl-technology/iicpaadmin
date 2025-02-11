import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        return NextResponse.json({message:"Get Test Data"})
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Server Error"});
    }
}