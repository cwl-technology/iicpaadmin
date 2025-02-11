"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";
import Swal from "sweetalert2";

export default function page() {

    const [roleData, setRoleData] = useState();


    const getRolesData = async () => {
        try {
            const res = await axios.get(`/api/admin/roles/getAllRoles`);
            console.log(res.data);
            if (res.data.status == 1) {
                setRoleData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (roleData) {
            new DataTable("#myTable");
        }
    }, [roleData]);


    const handleDelete = async (id) => {

        const result = await Swal.fire({
            icon: "warning",
            width: "400px",
            title: "Are you sure?",
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Delete",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-secondary",
            }
        })

        if (result.isConfirmed) {
            try {
                const res = await axios.post(`/api/admin/roles/deleteRoles`, {
                    id: id
                })
                if (res.data.status == 1) {
                    toast.success(res.data.message);
                    getRolesData();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }



    useEffect(() => {
        getRolesData();
    }, [])

    return (
        <>
            <div className="app-main__inner">

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                View Roles
                            </div>
                            <div className="table-responsive">
                                <table
                                    id="myTable"
                                    className="align-middle mb-0 table table-borderless table-striped table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center">sr. no.</th>
                                            <th className="text-center">Role Name</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            roleData?.map((ele, ind) => (
                                                <tr key={ind}>
                                                    <td className="text-center text-muted">#{ind + 1}</td>

                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {ele.roleName}
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="text-center">
                                                        
                                                        <Link href="#" className="btn btn-danger btn-sm  mr-2 px-4" onClick={() => handleDelete(ele._id)}>Delete</Link>

                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
