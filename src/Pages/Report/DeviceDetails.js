import React, { useState, useRef } from "react";
import { DeviceData } from "../../Slices/ReportSlices";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../utils/Loader";

const Devicedetails = (Data) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState("");
    const [deviceData, setDeviceData] = useState([]);
    const { deviceData_response, deviceData_error, loading1 } = useSelector(
        (state) => state.reportSlice
    );
    const header = {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
    };
    const [selectedOption, setSelectedOption] = useState("Actual");

    // Mapping object for options and their corresponding intervals in seconds
    const optionIntervals = {
        "": 0,
        Actual: 0,
        "15s": 15,
        "30s": 30,
        "1 Minute": 60,
        "5 Minutes": 300,
        "10 Minutes": 600,
        "15 Minutes": 900,
        "30 Minutes": 1800,
        "1 Hour": 3600,
        "2 Hour": 7200,
        "4 Hour": 14400,
        "8 Hour": 28800,
        "12 Hour": 43200,
    };

    // Effect to log the interval when the selected option changes
    let intervalInSeconds = 0;
    useEffect(() => {
        intervalInSeconds = optionIntervals[selectedOption];
    }, [selectedOption, optionIntervals]);

    // Array of options
    const options = Object.keys(optionIntervals);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);

    function handleNextClick(event) {
        event.preventDefault();
        setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
    }

    function handlePrevClick(event) {
        event.preventDefault();
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
    useEffect(() => {

        const Page = currentPage
        const data = Data.Data;

        dispatch(DeviceData({ Page, data, header }));
    }, [currentPage, Data])

    useEffect(() => {
        if (deviceData_response) {
            setDeviceData(deviceData_response?.data);
            setPage(deviceData_response.pagination.page);
        }
    }, [deviceData_response, currentPage])
    const deviceDataLog = () => {
        return deviceData?.map((enterprise) => {
            return enterprise?.State.map((state) => {
                return state?.location.map((location) => {
                    return location?.gateway.map((gateway) => {
                        return gateway?.optimizer.map((optimizer) => {
                            return optimizer?.optimizerLogs.map((log) => {
                                // Extract date and time from the timestamp
                                const timestampInMillis = parseInt(log.TimeStamp) * 1000;

                                // Create a new Date object using the timestamp
                                const timestampDate = new Date(timestampInMillis);

                                // Format date as "DD-MM-YYYY"
                                const formattedDate = `${timestampDate
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}-${(timestampDate.getMonth() + 1)
                                        .toString()
                                        .padStart(2, "0")}-${timestampDate.getFullYear()}`;

                                // Format time as "hh:mm A"
                                const formattedTime = timestampDate.toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true,
                                    }
                                );
                                return (
                                    <tr
                                        className="text-gray-700 dark:text-gray-400"
                                        key={log._id}
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            <span className="ml-2">
                                                <span className="">{enterprise.EnterpriseName}</span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{state.stateName}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {location.locationName}
                                        </td>
                                        <td className="px-4 py-3 text-sm">{gateway.GatewayName}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {log.OptimizerID.OptimizerID}
                                        </td>

                                        <td className="px-4 py-3 text-sm">{formattedDate}</td>
                                        <td className="px-4 py-3 text-sm">{formattedTime}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                {/* <!-- Avatar with inset shadow --> */}
                                                <div className="relative hidden w-4 h-4 mr-2 rounded-full md:block">
                                                    <div className="online"></div>
                                                </div>
                                                <div>
                                                    {log.DeviceStatus ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-4 py-2 rounded-full dark:bg-green-900 dark:text-green-300">
                                                        ONLINE
                                                    </span> : <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-4 py-2 rounded-full dark:bg-red-900 dark:text-red-300">
                                                        OFFLINE
                                                    </span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                {/* <!-- Avatar with inset shadow --> */}
                                                <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="#fb3b1f"
                                                        className="bi bi-thermometer"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                                                        <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{log.CoilTemperature}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                {/* <!-- Avatar with inset shadow --> */}
                                                <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="#fb3b1f"
                                                        className="bi bi-thermometer"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                                                        <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{log.RoomTemperature}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                {/* <!-- Avatar with inset shadow --> */}
                                                <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 328.611 328.611"
                                                        xmlSpace="preserve"
                                                        width="20"
                                                        height="20"
                                                        fill="#056afc"
                                                    >
                                                        <path d="M209.306 50.798a7.5 7.5 0 0 0-12.088 8.883c54.576 74.266 66.032 123.541 66.032 151.8 0 27.691-8.272 52.794-23.293 70.685-17.519 20.866-42.972 31.446-75.651 31.446-73.031 0-98.944-55.018-98.944-102.131 0-52.227 28.103-103.234 51.679-136.829 25.858-36.847 52.11-61.415 52.37-61.657a7.5 7.5 0 0 0-10.209-10.99c-1.11 1.031-27.497 25.698-54.254 63.765-24.901 35.428-54.586 89.465-54.586 145.71 0 31.062 9.673 59.599 27.236 80.353 20.361 24.061 50.345 36.779 86.708 36.779 36.794 0 66.926-12.726 87.139-36.801 17.286-20.588 26.806-49.117 26.806-80.33-.001-55.265-37.493-117.884-68.945-160.683z" />
                                                        <path d="M198.43 148.146-95.162 95.162a7.5 7.5 0 0 0 5.304 12.803 7.478 7.478 0 0 0 5.304-2.197l95.162-95.162a7.5 7.5 0 0 0 0-10.606 7.502 7.502 0 0 0-10.608 0zm-6.465 59.753c-13.292 0-24.106 10.814-24.106 24.106s10.814 24.106 24.106 24.106 24.106-10.814 24.106-24.106-10.814-24.106-24.106-24.106zm0 33.212c-5.021 0-9.106-4.085-9.106-9.106s4.085-9.106 9.106-9.106 9.106 4.085 9.106 9.106-4.085 9.106-9.106 9.106zm-66.787-46.949c13.292 0 24.106-10.814 24.106-24.106s-10.814-24.106-24.106-24.106-24.106 10.814-24.106 24.106 10.814 24.106 24.106 24.106zm0-33.213c5.021 0 9.106 4.085 9.106 9.106s-4.085 9.106-9.106 9.106-9.106-4.085-9.106-9.106 4.084-9.106 9.106-9.106z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{log.Humidity}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{log.OptimizerMode}</td>
                                    </tr>
                                );
                            });
                        });
                    });
                });
            });
        });
    };
    //Download CSV
    const downloadFile = async (url, requestBody, defaultFilename) => {
        try {
            const response = await axios.post(url, requestBody, {
                responseType: "blob",
            });
            const disposition = response.headers["content-disposition"];
            const filename = disposition
                ? disposition.split("filename=")[1]
                : defaultFilename;

            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
        }
    };

    const handleDownloadDeviceData = () => {
        const requestBody = Data.Data;

        downloadFile(
            `${process.env.REACT_APP_API}/api/admin/download/all/devicedata/report`,
            requestBody,
            `DeviceDataReport_${new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            })}.csv`
        );
    };
    return (
        <>
            {loading1 && <Loader />}
            <div
                role="tabpanel"
            >
                <div className="flex justify-between items-center">
                    <div className="w-56 flex justify-between items-center ">
                        <h4 className="classtitle mr-4">Interval</h4>
                        <select className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                            {/* <option></option> */}
                            <option>Actual</option>
                            <option>1 Minute</option>
                            <option>15s</option>
                            <option>30s</option>
                            <option>5 Minutes</option>
                            <option>10 Minutes</option>
                            <option>15 Minutes</option>
                            <option>30 Minutes</option>
                            <option>1 Hour</option>
                            <option>2 Hour</option>
                            <option>4 Hour</option>
                            <option>8 Hour</option>
                            <option>12 Hour</option>
                        </select>
                    </div>

                    <div className="download_btn" style={{ position: "sticky", top: "0", zIndex: "1000" }}>
                        <button
                            type="button"
                            className="py-2 px-3 mt-2 focus:outline-none text-white rounded-lg   "
                            onClick={handleDownloadDeviceData}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4a90e2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* <!-- table data --> */}
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 py-3">Enterprise</th>
                            <th className="px-4 py-3">State</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Gateway ID</th>
                            <th className="px-4 py-3">Optimizer ID</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Grill temp</th>
                            <th className="px-4 py-3">Room temp</th>
                            <th className="px-4 py-3">Humidity</th>
                            <th className="px-4 py-3">Mode</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {deviceDataLog()}
                    </tbody>
                </table>
                <div
                    className="block opacity-100"
                    id="matadeta"
                    role="tabpanel"
                >
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                        <span className="flex items-center col-span-3">
                            {`Page No.  ${page} `}
                        </span>
                        <span className="col-span-2"></span>
                        {/* Pagination  */}

                        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                        <button
                                            className="py-2 px-3 mt-2 focus:outline-none text-white rounded-lg bg-purple-600 active:bg-purple-600"
                                            style={{ marginRight: "10px" }}
                                            aria-label="Previous"
                                            onClick={(event) => {
                                                handlePrevClick(event);
                                            }}
                                        >
                                            Prev
                                        </button>
                                    </li>
                                    {/* {renderPaginationButtons()} */}
                                    <li>
                                        <button
                                            className="py-2 px-3 mt-2 focus:outline-none text-white rounded-lg bg-purple-600 active:bg-purple-600"
                                            aria-label="Next"
                                            onClick={(event) => {
                                                handleNextClick(event);
                                            }}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Devicedetails;