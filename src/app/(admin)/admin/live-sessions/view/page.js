"use client";

import DateFormatter from "@/_helper/frontend/DateFormatter";
import TimeFormatter from "@/_helper/frontend/TimeFormatter";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";
import Swal from "sweetalert2";

export default function page() {

    const [liveSessionData, setLiveSessionData] = useState();
    const [courseData, setCourseData] = useState();

    useEffect(() => {
        getLiveSessionData();
        getCourseData();
    }, [])


    const getLiveSessionData = async () => {
        try {
            const res = await axios.get(`/api/livesessions/getAllLiveSessions`);
            console.log(res.data);
            if (res.data.status == 1) {
                setLiveSessionData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getCourseData = async () => {
        try {
            const res = await axios.get("/api/courses/getAllActiveCourses");
            if (res.data.status == 1) {
                setCourseData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getCourseNameById = (id) => {
        const course = courseData?.find((ele, ind) => ele._id == id);
        return course?.courseName || "Unknown";
    }

    useEffect(() => {
        if (liveSessionData) {
            new DataTable("#myTable");
        }
    }, [liveSessionData]);


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
                const res = await axios.post(`/api/livesessions/deleteLiveSession`, {
                    id: id
                })
                console.log(res.data);
                if (res.data.status == 1) {
                    toast.success(res.data.message);
                    getLiveSessionData();
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
                const res = await axios.post(`/api/livesessions/changeStatus`, {
                    id: id,
                    status: status
                })

                if (res.data.status === 1) {
                    getLiveSessionData();
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
                                View Course Category

                            </div>
                            <div className="table-responsive">
                                <table
                                    id="myTable"
                                    className="align-middle mb-0 table table-borderless table-striped table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center">sr. no.</th>
                                            <th className="text-center">Course Name</th>
                                            <th className="text-center">Date</th>
                                            <th className="text-center">Start Time</th>
                                            <th className="text-center">End Time</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            liveSessionData?.map((ele, ind) => (
                                                <tr key={ind}>
                                                    <td className="text-center text-muted">#{ind + 1}</td>

                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {getCourseNameById(ele.courseId)}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            <DateFormatter date={ele.date} />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            <TimeFormatter time={ele.startTime} />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            <TimeFormatter time={ele.endTime} />
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {
                                                            ele.status == 1 ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                                                        }

                                                    </td>
                                                    <td className="text-center">
                                                        <Link href={{
                                                            pathname: "/admin/live-sessions/edit",
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
