"use client";
import { Chart as ChartJS, ArcElement, Legend, Tooltip as ToolTipChart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, Bar, } from 'recharts';
import dynamic from "next/dynamic";
import { useState } from "react";

const AreaChart = dynamic(() => import('recharts').then((mod) => mod.AreaChart), { ssr: false });
const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((mod) => mod.BarChart), { ssr: false });

export const options1 = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
const data1 = {
  labels: ['Total order', 'Pending order', 'Completed order'],
  datasets: [
    {
      data: [234, 345, 763],
      backgroundColor: [
        'rgba(54, 162, 235)',
        'rgba(153, 102, 255)',
        '#3ac47d'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        // '#82ca9d'
        '#3ac47d'
      ],
      hoverOffset: 10,
      cutout: "62%",
      radius: "80%"
    },
  ],
};

const data2 = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }

]
const data3 = [
  {
    name: 'Page A',
    uv: 1000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 4000,
    pv: 3508,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 3000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function page() {
  ChartJS.register(ArcElement, Legend, ToolTipChart);
  const [active, setActive] = useState("day");

  return (
    <>
      <div className="app-main__inner ">
        

        <div className="row clearfix px-2">
          <div className="col-md-3 px-2 mt-2 mt-md-0">
            <div className="card">
              <div className="body d-flex align-items-center dashboad-card">
                <div className="s_chart" >

                  <BarChart width={50} height={50} data={data3}>
                    <Bar dataKey="uv" fill="rgba(54, 162, 235, 1)" />
                  </BarChart>
                </div>
                <div className="s_detail">
                  {/* <h4 className="mb-0">{mainData?.totalOrder}</h4> */}
                  <h4 className="font-30 font-weight-bold text-col-blue mb-0">987</h4>
                  <span>Total Order</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mt-2 mt-md-0">
            <div className="card">
              <div className="body d-flex align-items-center dashboad-card">
                <div className="s_chart" >
                  <LineChart width={50} height={50} data={data3}>
                    <Line type="monotone" dataKey="pv" stroke="#3ac47d" strokeWidth={2} dot={false} />
                  </LineChart>
                </div>
                <div className="s_detail">
                  {/* <h4 className="mb-0">{mainData?.totalOrder}</h4> */}
                  <h4 className="font-30 font-weight-bold text-col-blue mb-0">187</h4>
                  <span>Total Order</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mt-2 mt-md-0">
            <div className="card">
              <div className="body d-flex align-items-center dashboad-card">
                <div className="s_chart">

                  <BarChart width={50} height={50} data={data3}>
                    <Bar dataKey="uv" fill="rgba(54, 162, 235, 1)" />
                  </BarChart>
                </div>
                <div className="s_detail">
                  {/* <h4 className="mb-0">{mainData?.totalOrder}</h4> */}
                  <h4 className="font-30 font-weight-bold text-col-blue mb-0">557</h4>
                  <span>Total Order</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mt-2 mt-md-0">
            <div className="card">
              <div className="body d-flex align-items-center dashboad-card">
                <div className="s_chart" >
                  <LineChart width={50} height={50} data={data3}>
                    <Line type="monotone" dataKey="pv" stroke="#3ac47d" strokeWidth={2} dot={false} />
                  </LineChart>
                </div>
                <div className="s_detail">
    
                  <h4 className="font-30 font-weight-bold text-col-blue mb-0">193</h4>
                  <span>Total Order</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row clearfix mt-4">
          <div className="col-sm-12">
            <div className="card">
              <div className="body dashboad-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="mb-0 orders-heading">Orders</h4>
                  </div>
                  <ul className="nav nav-tabs2">
                    <li className="nav-item order-tabs" onClick={() => setActive("day")}><a className={`nav-link ${active == "day" ? "sidebar-active show" : ""}`} data-toggle="tab"
                      href="#">Today</a></li>
                    <li className="nav-item order-tabs" onClick={() => setActive("month")}><a className={`nav-link ${active == "month" ? "sidebar-active show" : ""}`} data-toggle="tab"
                      href="#">Month</a></li>
                    <li className="nav-item order-tabs" onClick={() => setActive("year")}><a className={`nav-link ${active == "year" ? "sidebar-active show" : ""}`} data-toggle="tab"
                      href="#">Year</a></li>
                  </ul>
                </div>
                <div className="row clearfix">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    {/* <small>Audience It is a long established fact that a reader will be
                                            distracted</small> */}
                    <div className="d-flex justify-content-sm-start justify-content-md-center mt-4">
                      <div className="mr-5" style={{ marginTop: "-10px" }}>
                        <label className="mb-0">Total </label>
                        <h4 className='text-center'>432</h4>
                      </div>
                      <div className="mr-5" style={{ marginTop: "-10px" }}>
                        <label className="mb-0">Complete </label>
                        <h4 className='text-center'>765</h4>
                      </div>
                      <div style={{ marginTop: "-10px" }}>
                        <label className="mb-0">Pending</label>
                        <h4 className='text-center'>324</h4>
                      </div>
                    </div>
                    <div id="chart-donut" className="chart-donut d-flex justify-content-center">
                      <Doughnut data={data1} options={options1} />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12">
                    <div id="flotChart" className="flot-chart" >
                      <ResponsiveContainer>
                        <AreaChart data={data2}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3ac47d" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3ac47d" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" />
                          <YAxis />
                          {/* <CartesianGrid strokeDasharray="1 1" /> */}
                          <Tooltip />
                          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                          <Area type="monotone" dataKey="pv" stroke="#3ac47d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                Active Users
              </div>
              <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th className="text-center">City</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center text-muted">#345</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <div className="widget-content-left">
                                <img
                                  width="40"
                                  className="rounded-circle"
                                  src="assets/images/avatars/4.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">John Doe</div>
                              <div className="widget-subheading opacity-7">
                                Web Developer
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">Madrid</td>
                      <td className="text-center">
                        <div className="badge badge-warning">Pending</div>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          id="PopoverCustomT-1"
                          className="btn btn-primary btn-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center text-muted">#347</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <div className="widget-content-left">
                                <img
                                  width="40"
                                  className="rounded-circle"
                                  src="assets/images/avatars/3.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">
                                Ruben Tillman
                              </div>
                              <div className="widget-subheading opacity-7">
                                Etiam sit amet orci eget
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">Berlin</td>
                      <td className="text-center">
                        <div className="badge badge-success">Completed</div>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          id="PopoverCustomT-2"
                          className="btn btn-primary btn-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center text-muted">#321</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <div className="widget-content-left">
                                <img
                                  width="40"
                                  className="rounded-circle"
                                  src="assets/images/avatars/2.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">Elliot Huber</div>
                              <div className="widget-subheading opacity-7">
                                Lorem ipsum dolor sic
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">London</td>
                      <td className="text-center">
                        <div className="badge badge-danger">In Progress</div>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          id="PopoverCustomT-3"
                          className="btn btn-primary btn-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center text-muted">#55</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <div className="widget-content-left">
                                <img
                                  width="40"
                                  className="rounded-circle"
                                  src="assets/images/avatars/1.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">
                                Vinnie Wagstaff
                              </div>
                              <div className="widget-subheading opacity-7">
                                UI Designer
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">Amsterdam</td>
                      <td className="text-center">
                        <div className="badge badge-info">On Hold</div>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          id="PopoverCustomT-4"
                          className="btn btn-primary btn-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
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
