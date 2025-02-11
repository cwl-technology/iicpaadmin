import permissionsModel from "@/_models/permissionsModel";
import roleModel from "@/_models/roleModel";
import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const { id } = await request.json();
        const data1 = await roleModel.findByIdAndDelete({ _id: id });
        if (!data1) {
            return res.json({ message: "Unable to deleted role!", status: 0 });
        }

        const data2 = await permissionsModel.deleteMany({ roleId: id });
        return NextResponse.json({ message: "Role deleted successfully.", status: 1 });
    } catch (err) {
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}