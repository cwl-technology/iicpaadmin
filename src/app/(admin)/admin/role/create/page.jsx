"use client"

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";


const page = () => {
    const [menuData, setMenuData] = useState();
    const router = useRouter();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()
    const [permissions, setPermissions] = useState([]);

    const getMenuData = async () => {
        try {
            const res = await axios.get("/api/menu/getMenuData");
            if (res.data.status == 1) {
                setMenuData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMenuData();
    }, []);

    const handleChecked = (mainIndex, menuId, service) => {
        setPermissions((prevPermission) => {
            let updatedPermission = [...prevPermission];
            updatedPermission[mainIndex] = [...(updatedPermission[mainIndex] || [])];

            if (!updatedPermission[mainIndex]?.includes(menuId)) {
                updatedPermission[mainIndex]?.push(menuId)
            }

            if (!updatedPermission[mainIndex].includes(service)) {
                updatedPermission[mainIndex].push(service)
            } else {
                updatedPermission[mainIndex] = updatedPermission[mainIndex]?.filter((ele) => ele != service)
            }

            return updatedPermission
        })
    };


    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/api/admin/roles/createRoles", {
                roleName: data.roleName,
                permissions: permissions
            });
            if (res.data.status == 1) {
                router.push("/admin/role/view");
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            Create Role
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Role
                                    </legend>
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label>
                                                Role Name
                                            </label>
                                            <input
                                                {...register("roleName", {
                                                    required: {
                                                        value: true,
                                                        message: "Role is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.roleName ? "border-danger" : ""}`}
                                                type="text"
                                                placeholder="Enter the role"
                                            />
                                            {errors.roleName &&
                                                <p className="text-danger">{errors.roleName.message}</p>}
                                        </div>
                                    </div>
                                </fieldset>
                                {
                                    menuData?.map((ele, ind) =>
                                        <fieldset className="border rounded p-3 px-4 mb-4" key={ind}>
                                            <legend className="float-none w-auto px-3">
                                                {ele.menuName}
                                            </legend>
                                            {
                                                [1, 2, 3, 4, 5].map((e, i) => {
                                                    if (ele[`service_${e}`]) {
                                                        return (
                                                            <div className="form-row float-left ml-3 " key={i}>
                                                                <div className="col-md-3 ">
                                                                    <div className="form-group form-check pointer-cursor">
                                                                        <input type="checkbox" className="form-check-input pointer-cursor"
                                                                            id={`${ele.menuName}_${e}`}
                                                                            onChange={() => handleChecked(ind, ele._id, ele[`service_${e}`])}
                                                                        />
                                                                        <label className="form-check-label pointer-cursor" htmlFor={`${ele.menuName}_${e}`}>{ele[`service_${e}`]}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </fieldset>
                                    )
                                }
                                <button className="mt-2 px-3 btn btn-thm px-4" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page