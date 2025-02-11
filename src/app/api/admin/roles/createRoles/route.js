import permissionsModel from "@/_models/permissionsModel";
import roleModel from "@/_models/roleModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const { roleName, permissions } = await request.json();
        if (!roleName) {
            return NextResponse.json({ message: "Please provide role name !", status: 0 });
        }
        const role = new roleModel({ roleName });
        const roleData = await role.save();
        if (!roleData) {
            return NextResponse.json({ message: "Unable to get Role Id", status: 0 });
        }

        const formattedPermissions = permissions.map((ele) => ({
            menuId: ele[0],
            service_1: ele.includes("Create") ? 1 : 0,
            service_2: ele.includes("View") ? 1 : 0,
            service_3: ele.includes("Update") ? 1 : 0,
            service_4: ele.includes("Delete") ? 1 : 0,
            service_5: ele.includes("Active/Inactive") ? 1 : 0,
            roleId: roleData._id
        }))

        await permissionsModel.insertMany(formattedPermissions);
        return NextResponse.json({ message: "Role created successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}