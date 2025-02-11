"use client"

import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

const page = () => {
    const [actualPrice, setActualPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const [courseCategoryData, setCourseCategoryData] = useState();

    // Description 
    const [courseDesc, setCourseDesc] = useState('');
    const [examAndCertiDesc, setExamAndCertiDesc] = useState('');
    const [caseStudyDesc, setCaseStudyDecs] = useState('');

    // Image 
    const [courseImage, setCourseImage] = useState("");
    const [certificateImage, setCertificateImage] = useState();

    //Package instances
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()
    const router = useRouter();
    const editor = useRef(null);
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...',
        height: "300px"
    }),
    );

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const onSubmit = async (data) => {
        try {
            
            const formdata = new FormData();
            formdata.append("courseCategory", data.courseCategory);
            formdata.append("courseName", data.courseName);
            formdata.append("courseSlug", data.courseSlug);
            formdata.append("courseLevel", data.courseLevel);
            formdata.append("courseImage", data.courseImage[0]);
            formdata.append("actualPrice", data.actualPrice);
            formdata.append("discount", data.discount);
            formdata.append("priceAfterDiscount", finalPrice);
            formdata.append("courseVideoLink", data.courseVideoLink);
            formdata.append("courseDesc", courseDesc);
            formdata.append("certificateImage", data.certificateImage[0]);
            formdata.append("examAndCertiDesc", examAndCertiDesc);
            formdata.append("caseStudyDesc", caseStudyDesc);
            formdata.append("title", data.title);
            formdata.append("keywords", data.keywords);
            formdata.append("metaDescription", data.metaDescription);
            formdata.append("id", id);

            console.log(data);
            const res = await axios.post("/api/courses/updatedCourse", formdata);
            console.log(res.data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push("/admin/course/view");
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getCourseCategoryList = async (req, res) => {
        try {
            const res = await axios.get("/api/courseCategory/getAllCourseCategory");
            if (res.data.status == 1) {
                setCourseCategoryData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handlePriceChange = (e) => {
        const { name, value } = e.target;

        if (name === "actualPrice") {
            setActualPrice(value);
        } else if (name === "discount") {
            setDiscount(value);
        }

        const price = parseFloat(name === "actualPrice" ? value : actualPrice) || 0;
        const discountValue = parseFloat(name === "discount" ? value : discount) || 0;
        const discountedPrice = price - (price * discountValue) / 100;
        setFinalPrice(discountedPrice.toFixed(2));
    };

    const getCourseData = async () => {
        try {
            const res = await axios.post("/api/courses/getCourseById", {
                id: id
            });
            if (res.data.status == 1) {
                reset(res.data.data);
            }
        } catch (err) {
            conosole.log(err);
        }
    }

    useEffect(() => {
        if (id) {
            getCourseData();
        }
    }, [id])
    useEffect(() => {
        getCourseCategoryList();
    }, []);
    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            create Course
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Section
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Select Category
                                                </label>
                                                <select
                                                    {...register("courseCategory", {
                                                        required: {
                                                            value: true,
                                                            message: "Course category is required!"
                                                        }
                                                    })}
                                                    className={`form-control ${errors.courseCategory ? "border-danger" : ""}`}
                                                >

                                                    <option hidden defaultChecked value={""}>Select Category</option>
                                                    {
                                                        courseCategoryData?.map((ele, ind) =>
                                                            <option value={ele._id} key={ind}>{ele.categoryName}</option>)
                                                    }
                                                </select>
                                                {
                                                    errors.courseCategory && <p className="text-danger">{errors.courseCategory.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Select course level
                                                </label>
                                                <select
                                                    {...register("courseLevel", {
                                                        required: {
                                                            value: true,
                                                            message: "Course level is required!"
                                                        }
                                                    })}
                                                    className={`form-control ${errors.courseCombinations ? "border-danger" : ""}`}
                                                >

                                                    <option hidden defaultChecked value={""}>Select course level</option>
                                                    <option value="Pro">Pro</option>
                                                    <option value="Specailisations">Specailisations</option>
                                                    <option value="Levels">Levels</option>

                                                </select>
                                                {
                                                    errors.courseCombinations && <p className="text-danger">{errors.courseCombinations.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Course Name
                                                </label>
                                                <input {...register("courseName",
                                                    { required: { value: true, message: "Course name is required!" } }
                                                )}
                                                    className={`form-control ${errors.courseName ? "border-danger" : ""}`}
                                                    type="text"
                                                    placeholder="Enter the course name"
                                                />
                                                {
                                                    errors.courseName && <p className="text-danger">{errors.courseName.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Course Slug
                                                </label>
                                                <input {...register("courseSlug",
                                                    { required: { value: true, message: "Course slug is required!" } }
                                                )}
                                                    className={`form-control ${errors.courseName ? "border-danger" : ""}`}
                                                    type="text"
                                                    placeholder="Enter the course slug"
                                                />
                                                {
                                                    errors.courseName && <p className="text-danger">{errors.courseName.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Course Image
                                                </label>
                                                <input
                                                    {...register("courseImage")}
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={(e) => setCourseImage(e.target.files[0])}
                                                />
                                                {
                                                    errors.courseImage && <p className="text-danger">{errors.courseImage.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center">
                                            {
                                                courseImage && <img src={URL.createObjectURL(courseImage)} alt="error" width={"100px"} />
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Actual Price
                                                </label>
                                                <input
                                                    {...register("actualPrice")}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter the actual price"
                                                    value={actualPrice}
                                                    onChange={handlePriceChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Discount (%)
                                                </label>
                                                <input
                                                    {...register("discount")}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter the Discount"
                                                    value={discount}
                                                    onChange={handlePriceChange}
                                                />
                                                {
                                                    errors.discount && <p className="text-danger">{errors.discount.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Price After Discount
                                                </label>
                                                <input
                                                    {...register("priceAfterDiscount")}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Final Price"
                                                    value={finalPrice}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Course Video Link
                                                </label>
                                                <input
                                                    {...register("courseVideoLink")}
                                                    type="url"
                                                    className="form-control"
                                                    placeholder="Enter the course video link"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Course Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={courseDesc}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={newContent => setCourseDesc(newContent)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Exam and Certifications
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Certificate Image
                                                </label>
                                                <input
                                                    {...register("certificateImage")}
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={(e) => setCertificateImage(e.target.files[0])}
                                                />
                                                {
                                                    errors.certificateImage && <p className="text-danger">{errors.certificateImage.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center">
                                            {
                                                certificateImage && <img src={URL.createObjectURL(certificateImage)} alt="error" width={"100px"} />
                                            }
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={examAndCertiDesc}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={newContent => setExamAndCertiDesc(newContent)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Case studies
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={caseStudyDesc}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={newContent => setCaseStudyDecs(newContent)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        SEO section
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Title
                                                </label>
                                                <input
                                                    {...register("title")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the title"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Keyword
                                                </label>
                                                <textarea
                                                    {...register("keywords")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the keyword"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <textarea
                                                    {...register("metaDescription")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the keyword"
                                                ></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </fieldset>

                                <button className="mt-2 px-4 btn btn-thm" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page