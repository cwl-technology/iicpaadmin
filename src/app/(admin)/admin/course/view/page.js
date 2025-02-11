"use client";

import axios from "axios";
// import api from "@/_config/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";
import Swal from "sweetalert2";

export default function page() {

    const [courseCategory, setCourseCategory] = useState();
    const [courseData, setCourseData] = useState();

    useEffect(() => {
        getCourseCategoryList();
        getCourseData();
    }, [])

    const getCourseCategoryList = async () => {
        try {
            const res = await axios.get(`/api/courseCategory/getAllActiveCourseCategory`);
            if (res.data.status === 1) {
                setCourseCategory(res.data.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getCourseCategoryById = (id) => {
        const category = courseCategory?.find((ele) => ele._id == id);
        return category?.categoryName;
    }

    const getCourseData = async () => {
        try {
            const res = await axios.get(`/api/courses/getAllCourses`);
            if (res.data.status == 1) {
                setCourseData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (courseData) {
            new DataTable("#myTable");
        }
    }, [courseData]);


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
                const res = await axios.post(`/api/courses/deleteCourse`, {
                    id: id
                })
                if (res.data.status == 1) {
                    toast.success(res.data.message);
                    getCourseData();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleChangeStatus = async (id, status) => {
        const result = await Swal.fire({
            icon: "warning",
            width: "400px",
            title: "Are you sure?",
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: `${status == 1 ? "Deactivate" : "Activate"}`,
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-secondary",
            }
        })
        if (result.isConfirmed) {
            try {
                const res = await axios.post(`/api/courses/changeStatus`, {
                    id: id,
                    status: status
                })

                console.log(res.data);
                if (res.data.status === 1) {
                    getCourseData();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <div className="app-main__inner">

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                View Course

                            </div>
                            <div className="table-responsive">
                                <table
                                    id="myTable"
                                    className="align-middle mb-0 table table-borderless table-striped table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center">sr. no.</th>
                                            <th className="text-center">Course Category</th>
                                            <th className="text-center">Course Name</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            courseData?.map((ele, ind) => (
                                                <tr key={ind}>
                                                    <td className="text-center text-muted">#{ind + 1}</td>
                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {getCourseCategoryById(ele.courseCategory)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {ele.courseName}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {
                                                            ele.status == 1 ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                                                        }

                                                    </td>
                                                    <td className="text-center">
                                                        <Link href={{
                                                            pathname: "/admin/chapter",
                                                            query: {
                                                                courseName: ele.courseName,
                                                                courseId: ele._id
                                                            }
                                                        }} className="btn btn-primary btn-sm mr-2">Chapters</Link>
                                                        <Link href={{
                                                            pathname: "/admin/course/edit",
                                                            query: { id: ele._id }
                                                        }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                                        <Link href="#" className="btn btn-danger btn-sm  mr-2" onClick={() => handleDelete(ele._id)}>Delete</Link>

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
