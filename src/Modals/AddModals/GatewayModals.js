import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GatewayModel, clearGatewayerror, clearGatewayResponse, } from "../../Slices/Enterprise/GatewaySlice";

function GatewayModals({ closeModal, data1 }) {
  const dispatch = useDispatch();
  const [onboardingDate, setOnboardingDate] = useState("");
  const [gatewayId, setGatewayId] = useState("");
  const [ssid, setSSID] = useState("SC20Linux");
  const [password, setPassword] = useState("12345678");
  const [errorMessage, setErrorMessage] = useState([]);
  const [ssidError, setSSIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordEditMode, setPasswordEditMode] = useState(true);
  const[ssidEditMode, setSsidEditMode] = useState(true)


  // Function to handle input changes and log values to the console
  const handleInputChange = (e, setStateFunction) => {
    const value = e.target.value;
    setStateFunction(value);
    // Check password validation
    if (e.target.name === "password" && value !== "12345678") {
      const isValid = validatePassword(value);
      if (!isValid) {
        setPasswordError("Password must contain minimum 8 characters and only '@', '_', '!', '#', '*'.");
        setTimeout(() => {
          setPasswordError("");
        }, 2000);
      } else {
        setPasswordError("");
      }
    }

    // Check SSID validation
    if (e.target.name === "ssid" && value !== "SC20Linux") {
      const isValidSSID = validateSSID(value);
      if (!isValidSSID) {
        setSSIDError("SSID must contain minimum 8 characters.");
        setTimeout(() => {
          setSSIDError();
        }, 2000);
      } else {
        setSSIDError("");
      }
    }
  };
  const toggleSsidEditMode = (e) => {
    e.preventDefault();
    // Show alert before enabling edit mode
    if (ssidEditMode) {      
      const userConfirmed = window.confirm("Are you sure you want to edit SSID?");
      if (userConfirmed) {
        setSsidEditMode(!ssidEditMode);
      }
    }else {
      const userConfirmed = window.confirm("Are you sure you want to disable edit SSID?");
      if (userConfirmed) {
        setSsidEditMode(!ssidEditMode);
      }
    }
  };
  const togglePasswordEditMode = (e) => {
    e.preventDefault();
    // Show alert before enabling edit mode
    if (passwordEditMode) {      
      const userConfirmed = window.confirm("Are you sure you want to edit Password ?");
      if (userConfirmed) {
        setPasswordEditMode(!passwordEditMode);
      }
    }else {
      const userConfirmed = window.confirm("Are you sure you want to disable edit Password?");
      if (userConfirmed) {
        setPasswordEditMode(!passwordEditMode);
      }
    }
  };
  const validateSSID = (ssid) => {
    return ssid.length >= 8 || ssid === "SC20Linux";
  };

  const validatePassword = (password) => {
    const regex = /^[@_!#*]+$/;
    return (password.length >= 8 && regex.test(password) || password === "12345678");
  };

  const EnterpriseId = window.localStorage.getItem("Enterprise_Id");
  const LocationId = window.localStorage.getItem("Location_id");
  const data = {
    EnterpriseInfo: LocationId,
    OnboardingDate: onboardingDate,
    GatewayID: gatewayId.trim(),
    NetworkSSID: ssid.trim(),
    NetworkPassword: password.trim(),
    EnterpriseUserID: EnterpriseId,
  };

  const { status, add_gatewaylist_response, add_gatewaylist_error, loading } =
    useSelector((state) => state.gatewaySlice);
  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  async function AddGateway() {
    dispatch(GatewayModel({ data, header }));
  }
  useEffect(() => {
    if (add_gatewaylist_error) {
      setErrorMessage(add_gatewaylist_error);
      setTimeout(() => {
        setErrorMessage([]);
      }, 2000);

      dispatch(clearGatewayerror());
    }
    if (add_gatewaylist_response.message == "Gateway added successfully.") {
      closeModal();
      dispatch(clearGatewayResponse());
    }
  }, [add_gatewaylist_error, add_gatewaylist_response, dispatch]);

  return (
    <div
      style={{ maxHeight: "auto", overflowY: "auto" }}
      className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    // onClick={closeModal}
    // onKeyDown={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
      >
        <div className="mt-4 mb-6">
          <p style={{ fontWeight: "bold" }}>Add Gateway</p>
          <form action="">
            <div className="flex justify-end mb-2">

              <button
                className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover:hover:text-gray-700"
                aria-label="close"
                onClick={closeModal}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <label className="block mt-4 text-sm">
              <header className="flex justify-end">
              </header>
              <span className="text-gray-700 dark:text-gray-400">
                Enterprise
              </span>
              <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                {data1.Enterprise}
              </span>
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Enterprise User
              </span>
              <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                {data1.EnterpriseUser}
              </span>
            </label>

            <div className="flex w-full space-x-3">
              <label className="block mt-4 text-sm w-full">
                <span className="text-gray-700 dark:text-gray-400">State</span>
                <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                  {data1.State}
                </span>
              </label>

              <label className="block mt-4 text-sm w-full">
                <span className="text-gray-700 dark:text-gray-400">
                  Location
                </span>
                <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                  {data1.Location}
                </span>
              </label>
            </div>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Date of Onboarding
              </span>
              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                type="date"
                name="onboardingDate"
                value={onboardingDate}
                onChange={(e) => handleInputChange(e, setOnboardingDate)}
              />
              {errorMessage.key === "OnboardingDate" && (
                <p
                  className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}
                >
                  {errorMessage.message}
                </p>
              )}
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Enter Gateway Id
              </span>
              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                type="text"
                name="gatewayId"
                value={gatewayId}
                onChange={(e) => handleInputChange(e, setGatewayId)}
              />
              {errorMessage.key === "GatewayID" && (
                <p
                  className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}
                >
                  {errorMessage.message}
                </p>
              )}
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">SSID</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                type="text"
                name="ssid"
                value={ssid}
                onChange={(e) => handleInputChange(e, setSSID)}
                disabled={ssidEditMode}
                />
                <button
                  onClick={(e) => toggleSsidEditMode(e)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 576 512"
                    style={{ fill: '#7e3af2' }}
                    >
                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                  </svg>                 
                </button>
                </div>
              {errorMessage.key === "NetworkSSID" && (
                <p
                  className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}
                >
                  {errorMessage.message}
                </p>
              )}
              {ssidError && (
                <p className="mt-2 text-xs text-red-500" style={{ color: "red" }}>
                  {ssidError}
                </p>
              )}
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">Password</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <input
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  disabled={passwordEditMode}
                />
                <button
                  onClick={(e) => togglePasswordEditMode(e)}
                  // className="px-2 py-2 border-2 border-purple-600 text-purple-600 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 576 512"
                    style={{ fill: '#7e3af2' }}
                    >
                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                  </svg>                 
                </button>
              </div>
              {errorMessage.key === "NetworkPassword" && (
                <p
                  className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}
                >
                  {errorMessage.message}
                </p>
              )}
              {passwordError && (
                <p className="mt-2 text-xs text-red-500" style={{ color: "red" }}>
                  {passwordError}
                </p>
              )}
            </label>
          </form>
        </div>
        <button
          className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          onClick={AddGateway}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default GatewayModals;
