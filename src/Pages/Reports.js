import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftMenuList from "../Common/LeftMenuList";
import TopNavbar from "../Common/TopNavbar";
import Loader from "../utils/Loader";
import moment from "moment";
import "daterangepicker";
import $, { event } from "jquery";
import { useSelector, useDispatch } from "react-redux";
import {
  enterpriseList, clearEnterpriseResonse,} from "../Slices/Enterprise/enterpriseSlice";
import { stateList, clearResponse } from "../Slices/Enterprise/StateSlices";
import {
  locationList,
  clearLocationResponse,
} from "../Slices/Enterprise/LocationSlice";
import {
  GatewayList,
  clearGatewaysResponse,
} from "../Slices/Enterprise/GatewaySlice";
function Reports() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [formData, setFormData] = useState({
    customer: "",
    state: "",
    location: "",
    gatewayId: "",
  });
  // const [stateData, setStateData] = useState("");
  const [apply, setApply] = useState(false);

  const [reportData, setReportData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [EnterpriseList, setEnterpriseList] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [LocationList, setLocationList] = useState([]);
  const [gatewayList, setGatewayList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userType, setUserType] = useState("");
  const handleRadioChange = (value) => {
    setUserType(value);
  };
  const [EnterpriseId, setSelectedEnterpriseId] = useState(""); //this is enterprise id
  const [StateId, setSelectedStateId] = useState(""); //this is state id
  const [LocationId, setSelectedLocationId] = useState(""); //this is Location id
  const [selectedGatewayId, setSelectedGatewayId] = useState(""); //this is Location id
  const [SelectedgatewayName, setSelectedgatewayName] = useState("");
  //Id's
  // CUSTOMER ------------------

  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const { customer_response, error } = useSelector(
    (state) => state.enterpriseSlice
  );
  const customer = async () => {
    setStateList([]);
    setLocationList([]);
    setGatewayList([]);

    setSelectedStateId("");
    setSelectedLocationId("");
    setSelectedGatewayId("");

    dispatch(clearResponse());
    dispatch(clearLocationResponse());
    dispatch(clearGatewaysResponse());

    dispatch(enterpriseList({ header }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // for customer id
    const selectedEnterprise = EnterpriseList.find(
      (enterprise) => enterprise.EnterpriseName === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedEnterprise && selectedEnterprise._id) {
      // Log the selected enterprise ID
      console.log(selectedEnterprise._id);

      // Set the selected enterprise ID in the state
      setSelectedEnterpriseId(selectedEnterprise._id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // STATE--------------------

  const { status, state_response, state_error, loading } = useSelector(
    (state) => state.stateSlices
  );

  const State = async () => {
    setLocationList([]);
    setGatewayList([]);

    setSelectedLocationId("");
    setSelectedGatewayId("");
    dispatch(clearLocationResponse());
    dispatch(clearGatewaysResponse());

    dispatch(stateList({ EnterpriseId, header }));
  };

  const handleFormChange1 = (e) => {
    const { name, value } = e.target;

    // for customer id
    const selectedState = statelist.find(
      (state) => state.State_ID.name === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedState && selectedState.State_ID._id) {
      // Log the selected enterprise ID
      console.log(selectedState.State_ID._id, "stateId");

      // Set the selected enterprise ID in the state
      setSelectedStateId(selectedState.State_ID._id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // endstate

  //Location
  const { location_response, location_error } = useSelector(
    (state) => state.locationSlice
  );

  const Location = async () => {
    setGatewayList([]);

    setSelectedGatewayId("");
    dispatch(clearGatewaysResponse());

    dispatch(locationList({ EnterpriseId, StateId, header }));
  };

  const handleFormChange2 = (e) => {
    const { name, value } = e.target;

    // for customer id
    const selectedLocation = LocationList.find(
      (state) => state.LocationName === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedLocation && selectedLocation._id) {
      // Log the selected enterprise ID
      console.log(selectedLocation._id, "LocationId");

      // Set the selected enterprise ID in the state
      setSelectedLocationId(selectedLocation._id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Gateway

  const { gateway_response, gateway_error } = useSelector(
    (state) => state.gatewaySlice
  );

  const Gateway = async () => {
    dispatch(GatewayList({ LocationId, header }));
  };

  const handleFormChange3 = (e) => {
    const { name, value } = e.target;

    // for Gateway id
    const selectedGateway = gatewayList.find(
      (item) => item.GatewayID === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedGateway && selectedGateway.GatewayID) {
      // Log the selected enterprise ID
      console.log(selectedGateway.GatewayID, "GatewayId");

      // Set the selected enterprise ID in the state
      setSelectedGatewayId(selectedGateway.GatewayID);
      setSelectedgatewayName(selectedGateway._id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // End Id's

  useEffect(() => {
    if (customer_response && Array.isArray(customer_response)) {
      setEnterpriseList(customer_response);
    }
    if (state_response && Array.isArray(state_response.AllEntState)) {
      setStateList(state_response.AllEntState);
    }

    if (location_error) {
      // setErrorMessage(location_error.message);
    }

    if (location_response && location_response.AllEntStateLocation) {
      setLocationList(location_response.AllEntStateLocation);
    }

    if (gateway_response && gateway_response.AllEntStateLocationGateway) {
      setGatewayList(gateway_response.AllEntStateLocationGateway);
    }
  }, [customer_response, state_response, location_response, gateway_response]);

  const tabStyle = {
    cursor: "pointer",
  };

  // Date and Time
  useEffect(() => {
    $('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: moment().startOf("hour"),
      endDate: moment().startOf("hour").add(32, "hour"),
      locale: {
        format: "M/DD/YYYY hh:mm A",
      },
    });

    $('input[name="datetimes"]').on(
      "apply.daterangepicker",
      function (ev, picker) {
        const startDate = picker.startDate.format("M/DD/YYYY hh:mm A");
        const endDate = picker.endDate.format("M/DD/YYYY hh:mm A");
        setCurrentPage(1);
        setStartDate(startDate);
        setEndDate(endDate);
      }
    );
    // Clean up the date range picker when the component unmounts
    return () => {
      $('input[name="datetimes"]')?.data("daterangepicker")?.remove();
    };
  }, []);

  //Api Calling

  const deviceApi = async (event) => {
    event.preventDefault();
    setApply(true);

    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/admin/get/all/device/data?page=${currentPage}&pageSize=20`,

        {
          enterprise_id: EnterpriseId,
          state_id: StateId,
          location_id: LocationId,
          gateway_id: selectedGatewayId,
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeviceData(response?.data?.data);
    } catch (error) {
      if (
        error.response.data.message === "Invalid token" ||
        error.response.data.message === "Access denied"
      ) {
        window.localStorage.clear();
        window.location.href = "./";
      }
    }
  };

  async function reportApi(event) {
    console.log("this is rendering");
    event.preventDefault();
    setApply(true);
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/admin/get/all/meter/data?page=${currentPage}&pageSize=100`,
        {
          Customer: EnterpriseId,
          Stateid: StateId,
          Locationid: LocationId,
          Gatewayid: SelectedgatewayName,
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReportData(response?.data?.response);
    } catch (error) {
      if (
        error.response.data.message === "Invalid token" ||
        error.response.data.message === "Access denied"
      ) {
        window.localStorage.clear();
        window.location.href = "./";
      }
    }
  }

  const TableData = [];

  const generateRows = () => {
    return reportData?.map((enterprise) => {
      return enterprise?.State.map((state) => {
        return state?.location.map((location) => {
          return location?.gateway.map((gateways) => {
            return gateways?.GatewayLogs.map((log) => {
              // Extract date and time from the timestamp
              const timestampInMillis = parseInt(log?.TimeStamp) * 1000;

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
              const formattedTime = timestampDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              });

              const table = (
                <tr key={log._id}>
                  <td className="px-4 py-3 text-sm">
                    <span className="">{enterprise.EnterpriseName}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">{state.stateName}</td>
                  <td className="px-4 py-3 text-sm">{location.locationName}</td>
                  <td className="px-4 py-3 text-sm">{gateways.GatewayName}</td>
                  <td className="px-4 py-3 text-sm">{formattedDate}</td>
                  <td className="px-4 py-3 text-sm">{formattedTime}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/electricity-icon-png-4556 (1).png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{log.KWH}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{log.KVAH}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{log.PF}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {log.Phases.Ph1.Voltage}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {log.Phases.Ph1.Current}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {log.Phases.Ph2.Voltage}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {log.Phases.Ph2.Current}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {log.Phases.Ph3.Voltage}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden  w-4 h-4 mr-2 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="assets/img/flash.png"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {log.Phases.Ph3.Current}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              );
              TableData.push(table);
              return table;
            });
          });
        });
      });
    });
  };

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
                        {log.DeviceStatus ? <p className="font-semibold">Online</p> : <p className="font-semibold">Offline</p>}
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
  // State to manage the selected option
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
    //console.log(`Selected Interval: ${intervalInSeconds} seconds`);
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
    // console.log(currentPage,"thisis ----------")
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  useEffect(() => {
    const fakeEvent = { preventDefault: () => {} }; // create a fake event object with preventDefault method
    reportApi(fakeEvent);
    deviceApi(fakeEvent);
  }, [currentPage]);

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
      
      // console.log(response.data,"=================================");
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownloadDeviceData = () => {
    const requestBody = {
      enterprise_id: EnterpriseId,
      state_id: StateId,
      location_id: LocationId,
      gateway_id: selectedGatewayId,
      startDate: startDate,
      endDate: endDate,
    };

    downloadFile(
      `${process.env.REACT_APP_API}/api/admin/download/all/devicedata/report`,
      requestBody,
      `DeviceDataReport_${new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })}.csv`
    );
  };

  const handleDownloadMeterData = () => {
    const requestBody = {
      Customer: EnterpriseId,
      Stateid: StateId,
      Locationid: LocationId,
      Gatewayid: SelectedgatewayName,
      startDate: startDate,
      endDate: endDate,
    };

    downloadFile(
      `${process.env.REACT_APP_API}/api/admin/download/all/meterdata/report`,
      requestBody,
      `MeterDataReport_${new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })}.csv`
    );
  };

  return (
    <>
    {loading &&<Loader/>}
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <LeftMenuList />
      <div className="flex flex-col flex-1 w-full">
        <TopNavbar />
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Reports
            </h2>
            {/* <!-- CTA -->
    

          <!-- With avatar -->
          <!-- <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
            Table Data
          </h4> --> */}
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs relative">
              <form action="">
                <div className="mb-6 flex space-x-3 p-3">
                  <label className="block mt-4 text-sm w-56">
                    <span className="text-gray-700 dark:text-gray-400">
                      Customer
                    </span>
                    <select
                      className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="customer"
                      value={formData.customer}
                      onChange={handleFormChange}
                      onFocus={customer}
                    >
                      <option></option>
                      {EnterpriseList.map((enterprise, index) => (
                        <option key={index}>{enterprise.EnterpriseName}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block mt-4 text-sm w-56">
                    <span className="text-gray-700 dark:text-gray-400">
                      State
                    </span>
                    <select
                      className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange1}
                      onFocus={State}
                    >
                      <option></option>
                      {statelist.map((item, index) => (
                        <option key={index}>{item.State_ID.name}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block mt-4 text-sm w-56">
                    <span className="text-gray-700 dark:text-gray-400">
                      Location
                    </span>
                    <select
                      className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange2}
                      onFocus={Location}
                    >
                      <option></option>
                      {LocationList.map((item, index) => (
                        <option key={index}>{item.LocationName}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block mt-4 text-sm w-56">
                    <span className="text-gray-700 dark:text-gray-400">
                      Gateway Id
                    </span>
                    <select
                      className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="gatewayId"
                      value={formData.gatewayId}
                      onChange={handleFormChange3}
                      onFocus={Gateway}
                    >
                      <option></option>
                      {gatewayList.map((item, index) => (
                        <option key={index}>{item.GatewayID}</option>
                      ))}
                    </select>
                  </label>
                  <div>
                    <label className="block mt-4 text-sm">
                      <span className="text-gray-700 dark:text-gray-400">
                        Date
                      </span>

                      <input
                        name="datetimes"
                        defaultValue="01/01/2018 - 01/15/2018"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder=" date end"
                      />
                    </label>
                  </div>

                  <label
                    htmlFor=""
                    className="block mt-8 text-sm "
                    style={{ paddingTop: "1%" }}
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        reportApi(event);
                        deviceApi(event);
                      }}
                      className="py-2 px-3 mt-2 focus:outline-none text-white rounded-lg bg-purple-600 active:bg-purple-600"
                    >
                      Apply
                    </button>
                  </label>
                </div>
              </form>

              <div className="w-full overflow-x-auto">
                {/* <!-- tab --> */}
                <div className="w-2/3">
                  <div className="relative right-0">
                    {/* -------------- */}
                    <ul
                      className="relative flex flex-wrap p-1 list-none rounded-xl bg-blue-gray-50/60"
                      data-tabs="tabs"
                      role="list"
                    >
                      <div className="inline-block bg-blue-100 dark:bg-purple-600 p-2 rounded-md shadow-md">
                        <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
                          <input
                            type="radio"
                            className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                            name="userType"
                            defaultValue="meterData" // Corrected value
                            onChange={() => handleRadioChange("meterData")} // Corrected value
                          />
                          <span className="ml-2 text-blue-500">Meter Data</span>
                        </label>
                      </div>

                      <div className="inline-block bg-blue-100 dark:bg-purple-600 p-2 rounded-md shadow-md ml-2">
                        <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
                          <input
                            type="radio"
                            className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                            name="userType"
                            defaultValue="deviceData" // Corrected value
                            onChange={() => handleRadioChange("deviceData")} // Corrected value
                          />
                          <span className="ml-2 text-blue-500">
                            Device Data
                          </span>
                        </label>
                      </div>
                    </ul>

                    {/* -----meter data ------ */}
                    {apply && userType === "meterData" && (
                      <div data-tab-content="" className=" px-2 py-4">
                        <div
                          className="block opacity-100"
                          id="matadeta"
                          role="tabpanel"
                        >
                          <div className="flex justify-between items-center">
                            <div className="w-56 flex justify-between items-center ">
                              <h4 className="classtitle mr-4">Interval</h4>

                              <select
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                value={selectedOption}
                                onChange={(e) =>
                                  setSelectedOption(e.target.value)
                                }
                              >
                                {" "}
                                <options></options>
                                {options.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="download_btn">
                              <button
                                type="button"
                                className="py-2 px-3 mt-2 focus:outline-none text-white rounded-lg   "
                                onClick={handleDownloadMeterData}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#4a90e2"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
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
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3">KWH</th>
                                <th className="px-4 py-3">KVAH</th>
                                <th className="px-4 py-3">PF</th>
                                <th className="px-4 py-3">Ph1Voltage</th>
                                <th className="px-4 py-3">Ph1Current</th>
                                <th className="px-4 py-3">Ph2Voltage</th>
                                <th className="px-4 py-3">Ph2Current</th>
                                <th className="px-4 py-3">Ph3Voltage</th>
                                <th className="px-4 py-3">Ph3Current</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                              {generateRows()}
                            </tbody>
                          </table>
                        </div>

                        {/* <!-- device data --> */}

                        <div
                          className="block opacity-100"
                          id="matadeta"
                          role="tabpanel"
                        >
                          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                            <span className="flex items-center col-span-3">
                              {`Page No.  ${currentPage} `}
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
                    )}

                    {userType === "deviceData" && apply && (
                      <div
                        // className="hidden opacity-0"

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

                          <div className="download_btn">
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
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                              {`Page No.  ${currentPage} `}
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default Reports;
