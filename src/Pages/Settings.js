import React, { useState, useEffect } from "react";
import LeftMenuList from "../Common/LeftMenuList";
import TopNavbar from "../Common/TopNavbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  enterpriseList,
} from "../Slices/Enterprise/enterpriseSlice";
import { stateList, clearResponse } from "../Slices/Enterprise/StateSlices";
import {
  locationList,
  clearLocationResponse,
} from "../Slices/Enterprise/LocationSlice";
import {
  GatewayList,
  clearGatewaysResponse,
} from "../Slices/Enterprise/GatewaySlice";
import {
  OptimizerList,
  clearOptimizerResponse,
} from "../Slices/Enterprise/OptimizerSlice";
import { GetCurrentData,clearCurrentResponse } from "../Slices/SettingsSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          className="absolute bg-black text-white p-2 rounded z-10"
          style={{ width: "175px", textAlign: "center", padding: "5px 0" }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

function Settings() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");

  const [formData, setFormData] = useState({
    customer: "",
    state: "",
    location: "",
    gatewayId: "",
    optimizerId: "",
  });

  const [triggerData, setTriggerData] = useState(true);

  const [EnterpriseList, setEnterpriseList] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [locationlist, setLocationList] = useState([]);
  const [gatewayList, setGatewayList] = useState([]);
  const [optimizerList, setOptimizerList] = useState([]);
  const [EnterpriseId, setSelectedEnterpriseId] = useState(""); //this is enterprise id
  const [StateId, setSelectedStateId] = useState(""); //this is state id
  const [LocationId, setSelectedLocationId] = useState(""); //this is Location id
  const [GatewayId, setSelectedGatewayId] = useState(""); //this is Gateway id
  const [selectedOptimizerName, setSelectedOptimizerName] = useState(""); //this is Optimizer Name

  // Setting UI
  const [firstPowerOnObservationTime, setFirstPowerOnObservationTime] = useState(45);
  const [maxObservatioTime, setMaxObservatioTime] = useState(30);
  const [optimizationOnTime, setOptimizationOnTime] = useState(40);
  const [thermostatMonitoringInterval, setThermostatMonitoringInterval] = useState(45);
  const [thermostatMonitoringTimeIncrement,setThermostatMonitoringTimeIncrement] = useState(5);
  const [steadyStateTimeRoomTempTolerance,setSteadyStateTimeRoomTempTolerance] = useState(1);
  const [steadyStateCoilTempTolerance, setSteadyStateCoilTempTolerance] =  useState(0.1);
  const [group, setGroup] = useState("");
  const [id, setId] = useState("");

  //Setting Slice
  const { add_getCurentData_response, add_getCurentData_error } = useSelector((state) => state.settingsSlice);
  console.log({add_getCurentData_response});
  // CUSTOMER ------------------

  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const { customer_response } = useSelector(
    (state) => state.enterpriseSlice
  );
  const customer = async () => {
    setStateList([]);
    setLocationList([]);
    setGatewayList([]);
    setOptimizerList([]);
    setSelectedStateId("");
    setSelectedLocationId("");
    setSelectedGatewayId("");
    dispatch(clearResponse());
    dispatch(clearLocationResponse());
    dispatch(clearGatewaysResponse());
    dispatch(clearOptimizerResponse());

    dispatch(enterpriseList({ header }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTriggerData(true);
    // for customer id
    const selectedEnterprise = EnterpriseList.find(
      (enterprise) => enterprise.EnterpriseName === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedEnterprise && selectedEnterprise._id) {
      // Log the selected enterprise ID

      // Set the selected enterprise ID in the state
      setSelectedEnterpriseId(selectedEnterprise._id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // STATE--------------------

  const { state_response} = useSelector(
    (state) => state.stateSlices
  );

  const State = async () => {
    setLocationList([]);
    setGatewayList([]);
    setOptimizerList([]);
    setSelectedLocationId("");
    setSelectedGatewayId("");
    dispatch(clearLocationResponse());
    dispatch(clearGatewaysResponse());
    dispatch(clearOptimizerResponse());

    dispatch(stateList({ EnterpriseId, header }));
  };

  const handleFormChange1 = (e) => {
    const { name, value } = e.target;
    setTriggerData(true);
    // for customer id
    const selectedState = statelist.find(
      (state) => state.State_ID.name === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedState && selectedState.State_ID._id) {
      // Log the selected enterprise ID

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
  const { location_response } = useSelector(
    (state) => state.locationSlice
  );

  const Location = async () => {
    setGatewayList([]);
    setOptimizerList([]);
    setSelectedGatewayId("");
    dispatch(clearGatewaysResponse());
    dispatch(clearOptimizerResponse());

    dispatch(locationList({ EnterpriseId, StateId, header }));
  };

  const handleFormChange2 = (e) => {
    const { name, value } = e.target;
    setTriggerData(true);
    // for customer id
    const selectedLocation = locationlist.find(
      (state) => state.LocationName === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedLocation && selectedLocation._id) {
      // Log the selected enterprise ID
      setGroup("location");
      setId(selectedLocation._id);
      // Set the selected enterprise ID in the state
      setSelectedLocationId(selectedLocation._id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Gateway

  const { gateway_response } = useSelector(
    (state) => state.gatewaySlice
  );

  const Gateway = async () => {
    setOptimizerList([]);
    dispatch(clearOptimizerResponse());
    dispatch(GatewayList({ LocationId, header }));
  };

  const handleFormChange3 = (e) => {
    const { name, value } = e.target;
    setTriggerData(true);

    // for Gateway id
    const selectedGateway = gatewayList.find(
      (item) => item.GatewayID === value
    );

    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedGateway && selectedGateway.GatewayID) {
      // Log the selected enterprise ID
      setGroup("gateway");
      setId(selectedGateway._id);
      // Set the selected enterprise ID in the state
      setSelectedGatewayId(selectedGateway.GatewayID);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Optimizer

  const { optimizer_response} = useSelector(
    (state) => state.optimizerSlice
  );

  const Optimizer = async () => {
    dispatch(OptimizerList({ GatewayId, header }));
  };

  const handleFormChange4 = (e) => {
    const { name, value } = e.target;
    // for Gateway id
    const selectedOptimizer = optimizerList.find(
      (item) => item.OptimizerID === value
    );

    setSelectedOptimizerName(selectedOptimizer.OptimizerID);
    // Check if selectedEnterprise is not undefined before accessing its properties
    if (selectedOptimizer && selectedOptimizer._id) {
      // Log the selected enterprise ID
      setGroup("optimizer");
      setId(selectedOptimizer._id);
      // Set the selected enterprise ID in the state
      // setSelectedOptimizerId(selectedOptimizer._id);
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


    if (location_response && location_response.AllEntStateLocation) {
      setLocationList(location_response.AllEntStateLocation);
    }

    if (gateway_response && gateway_response.AllEntStateLocationGateway) {
      setGatewayList(gateway_response.AllEntStateLocationGateway);
    }
    if (
      optimizer_response &&
      optimizer_response.AllEntStateLocationGatewayOptimizer
    ) {
      setOptimizerList(optimizer_response.AllEntStateLocationGatewayOptimizer);
      setTriggerData(false);
      dispatch(clearOptimizerResponse());
    }

    if (add_getCurentData_response.success === true && add_getCurentData_response.data !== "No previous data" ) {
      setTriggerData(true);
      const data = add_getCurentData_response.data;
      showToast(add_getCurentData_response.message, "success");

      setOptimizationOnTime(parseInt(data.OptimizationOnTime) / 60);
      setFirstPowerOnObservationTime(
        parseFloat(data.firstPowerOnObservationTime) / 60
      );
      setMaxObservatioTime(parseInt(data.maxObservatioTime) / 60);
      setThermostatMonitoringInterval(
        parseFloat(data.thermostatMonitoringInterval)
      );
      setThermostatMonitoringTimeIncrement(
        parseFloat(data.thermostatMonitoringTimeIncrement)
      );
      setSteadyStateTimeRoomTempTolerance(
        parseFloat(data.steadyStateTimeRoomTempTolerance)
      );
      setSteadyStateCoilTempTolerance(
        parseFloat(data.steadyStateCoilTempTolerance)
      );
      dispatch(clearCurrentResponse());
    }
    else  {

      if (add_getCurentData_response.data === "No previous data") {
        setTriggerData(true);
        showToast(add_getCurentData_response.data, "error");
      }
      dispatch(clearCurrentResponse());
    }
    // if(add_getCurentData_response.data == null){
    //   showToast("Previous Data of this Optimizer is not Available", "error");
    // }
  }, [
    dispatch,
    customer_response,
    state_response,
    location_response,
    gateway_response,
    optimizer_response,
    add_getCurentData_response,
    add_getCurentData_error,
  ]);

  const data = {
    group: group,
    id: id,
    firstPowerOnObservationTime: firstPowerOnObservationTime * 60,
    maxObservatioTime: maxObservatioTime * 60,
    OptimizationOnTime: optimizationOnTime * 60,
    thermostatMonitoringInterval: thermostatMonitoringInterval,
    thermostatMonitoringTimeIncrement: thermostatMonitoringTimeIncrement,
    steadyStateTimeRoomTempTolerance: steadyStateTimeRoomTempTolerance,
    steadyStateCoilTempTolerance: steadyStateCoilTempTolerance,
  };

  const Data = {
    group: group,
    id: id,
  };
  const set = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/hardware/optimizer/setting/value/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        showToast(response.data.message, "success");
        setOptimizerList([]);
        dispatch(clearOptimizerResponse());
        setFormData((prevFormData) => ({
          ...prevFormData,
          optimizerId: "",
        }));
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  const reset = async () => {
    setFirstPowerOnObservationTime(45)
    setMaxObservatioTime(30);
    setOptimizationOnTime(40);
    setThermostatMonitoringInterval(45);
    setThermostatMonitoringTimeIncrement(5);
    setSteadyStateTimeRoomTempTolerance(1);
    setSteadyStateCoilTempTolerance(0.1);
    try {
      const response = await axios.post
      (
        `${process.env.REACT_APP_API}/api/hardware/reset/optimizer`,
        Data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        showToast(response.data.message, "success");
        setOptimizerList([]);
        dispatch(clearOptimizerResponse());
        setFormData((prevFormData) => ({
          ...prevFormData,
          optimizerId: "",
        }));
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  // Setting  UI

  const updateSliderValue = (value, setterFunction, fieldName) => {
    setterFunction(parseFloat(value));
  };

  // pop-up
  const showToast = (message, type) => {
    toast[type](message, {
      position: "bottom-left",
      autoClose: 3000,
    });
  };

  // Get current Data
  async function getCurrentData() {
    setTriggerData(true);
    dispatch(GetCurrentData({ selectedOptimizerName, header }));
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <LeftMenuList />
      <div className="flex flex-col flex-1 w-full">
        <TopNavbar />

        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Settings
            </h2>
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
                      onClick={customer}
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
                      {locationlist.map((item, index) => (
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

                  <label className="block mt-4 text-sm w-56">
                    <span className="text-gray-700 dark:text-gray-400">
                      Optimizer Id
                    </span>
                    <select
                      className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="optimizerId"
                      value={formData.optimizerId}
                      onChange={handleFormChange4}
                      onFocus={Optimizer}
                    >
                      <option></option>

                      {optimizerList.map((item, index) => (
                        <option key={index}>{item.OptimizerID}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className=" bg-white  shadow-xs dark:bg-gray-800 p-4">
                  <div className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      {/* Add similar sections for other sliders */}
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="firstPowerOnObservationTime"
                        >
                          First Power On Observation Time in minutes
                          <Tooltip text="After First Power On Intenlliserver Active Time in minutes">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="firstPowerOnObservationTime"
                            type="range"
                            step="01"
                            min="30"
                            max="60"
                            value={firstPowerOnObservationTime}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setFirstPowerOnObservationTime,
                                "firstPowerOnObservationTime"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="firstPowerOnObservationTime"
                            id="firstPowerOnObservationTimeOut"
                            className="ml-2"
                          >
                            {firstPowerOnObservationTime}
                          </b>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="maxObservatioTime"
                        >
                          Max Observation Time in minutes
                          <Tooltip text="In first Start Up and any other situation Intelliserver Maximum Observation Time in minutes">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="maxObservatioTime"
                            type="range"
                            step="01"
                            min="10"
                            max="30"
                            value={maxObservatioTime}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setMaxObservatioTime,
                                "maxObservatioTime"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="maxObservatioTime"
                            id="maxObservatioTimeOut"
                            className="ml-2"
                          >
                            {maxObservatioTime}
                          </b>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="optimizationOnTime"
                        >
                          Optimization On Time in minutes
                          <Tooltip text="When the Thermostat Comming Frequesntly Intelliserver Optimization ON Time in minutes">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="optimizationOnTime"
                            type="range"
                            step="01"
                            min="40"
                            max="90"
                            value={optimizationOnTime}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setOptimizationOnTime,
                                "optimizationOnTime"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="optimizationOnTime"
                            id="optimizationOnTimeOut"
                            className="ml-2"
                          >
                            {optimizationOnTime}
                          </b>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="thermostatMonitoringInterval"
                        >
                          Thermostat Monitoring Interval in seconds
                          <Tooltip text="When Thermostat Turn Off the Compressor after 2:45 Min Intelliserver Turn Off Monitoring Interval">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="thermostatMonitoringInterval"
                            type="range"
                            step="1"
                            min="45"
                            max="125"
                            value={thermostatMonitoringInterval}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setThermostatMonitoringInterval,
                                "thermostatMonitoringInterval"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="thermostatMonitoringInterval"
                            id="thermostatMonitoringIntervalOut"
                            className="ml-2"
                          >
                            {thermostatMonitoringInterval}
                          </b>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="thermostatMonitoringTimeIncrement"
                        >
                          Thermostat Monitoring Time Increment in seconds
                          <Tooltip text="Thermostate Monitoring Time Increment in seconds ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="thermostatMonitoringTimeIncrement"
                            type="range"
                            step="1"
                            min="5"
                            max="15"
                            value={thermostatMonitoringTimeIncrement}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setThermostatMonitoringTimeIncrement,
                                "thermostatMonitoringTimeIncrement"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="thermostatMonitoringTimeIncrement"
                            id="thermostatMonitoringTimeIncrementOut"
                            className="ml-2"
                          >
                            {thermostatMonitoringTimeIncrement}
                          </b>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="steadyStateTimeRoomTempTolerance"
                        >
                          Steady State Time Room Temperature Tolerance °C
                          <Tooltip text="Steady State Time Room Temperature Tolerance °C">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="steadyStateTimeRoomTempTolerance"
                            type="range"
                            step="0.1"
                            min="0.5"
                            max="1.0"
                            value={steadyStateTimeRoomTempTolerance}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setSteadyStateTimeRoomTempTolerance,
                                "steadyStateTimeRoomTempTolerance"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="steadyStateTimeRoomTempTolerance"
                            id="steadyStateTimeRoomTempTolerance"
                            className="ml-2"
                          >
                            {steadyStateTimeRoomTempTolerance}
                          </b>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex"
                          htmlFor="steadyStateCoilTempTolerance"
                        >
                          STEADY STATE COIL TEMP TOLERANCE °C
                          <Tooltip text="Steady State Time Room Temperature Tolerance °C">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0076ff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </Tooltip>
                        </label>
                        <div className="flex justify-between items-center">
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="steadyStateCoilTempTolerance"
                            type="range"
                            step="0.1"
                            min="0.1"
                            max="1.0"
                            value={steadyStateCoilTempTolerance}
                            onChange={(e) =>
                              updateSliderValue(
                                e.target.value,
                                setSteadyStateCoilTempTolerance,
                                "steadyStateCoilTempTolerance"
                              )
                            }
                          />
                          <b
                            style={{ color: "rgb(0, 119, 255)" }}
                            htmlFor="steadyStateCoilTempTolerance"
                            id="steadyStateCoilTempTolerance"
                            className="ml-2"
                          >
                            {steadyStateCoilTempTolerance}
                          </b>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="py-2 px-5 mr-3 px-3 mt-2 focus:outline-none text-white rounded-lg bg-purple-600 active:bg-purple-600"
                        onClick={getCurrentData}
                      >
                        Get Current Data
                      </button>
                      <button
                        type="button"
                        className="py-2 px-5 mr-3 px-3 mt-2 focus:outline-none text-gray-500 rounded-lg border-2 border-gray-300 active:bg-purple-600"
                        onClick={set}
                        disabled={triggerData ?  false:true }
                        // disabled={true}
                      >
                        Set
                      </button>
                      <button
                        type="button"
                        className="py-2 px-5 mt-2 focus:outline-none text-white rounded-lg bg-purple-600 active:bg-purple-600"
                        onClick={reset}
                        disabled={triggerData ?  false:true }
                        // disabled={true}
                      >
                        Reset
                      </button>
                    </div>
                    <ToastContainer />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;