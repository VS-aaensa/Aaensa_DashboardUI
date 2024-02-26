import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {GatewayModel,clearGatewayerror,clearGatewayResponse,} from "../../Slices/Enterprise/GatewaySlice";

function GatewayModals({ closeModal, data1 }) {
  const dispatch = useDispatch();
  const [onboardingDate, setOnboardingDate] = useState("");
  const [gatewayId, setGatewayId] = useState("");
  const [ssid, setSSID] = useState("SC20linux"); // Set default SSID
  const [password, setPassword] = useState("12345678"); // Set default password
  const [ssidError, setSSIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  // Function to handle input changes and log values to the console
  const handleInputChange = (e, setStateFunction) => {
    const value = e.target.value;
    setStateFunction(value);

    // Check password validation
    if (e.target.name === "password") {
      const isValid = validatePassword(value);
      if (!isValid) {
        setPasswordError("Password must contain minimum 8 characters and only '@', '_', '!', '#', '*'.");
      } else {
        setPasswordError("");
      }
    }

    // Check SSID validation
    if (e.target.name === "ssid") {
      const isValidSSID = validateSSID(value);
      if (!isValidSSID) {
        setSSIDError("SSID must contain minimum 8 characters.");
      } else {
        setSSIDError("");
      }
    }
  };

  const validateSSID = (ssid) => {
    return ssid.length >= 8;
  };

  const validatePassword = (password) => {
    const regex = /^[@_!#*]+$/;
    return password.length >= 8 && regex.test(password);
  };

  const EnterpriseId = window.localStorage.getItem("Enterprise_Id");
  const LocationId = window.localStorage.getItem("Location_id");
  const data = {
    EnterpriseInfo: LocationId,
    OnboardingDate: onboardingDate,
    GatewayID: gatewayId,
    NetworkSSID: ssid,
    NetworkPassword: password,
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
    if (add_gatewaylist_response.message === "Gateway added successfully.") {
      closeModal();
      dispatch(clearGatewayResponse());
    }
  }, [add_gatewaylist_error, add_gatewaylist_response, dispatch]);

  return (
    <div
      style={{ maxHeight: "auto", overflowY: "auto" }}
      className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
      >
        <div className="mt-4 mb-6">
          <p style={{ fontWeight: "bold" }}>Add Gateway</p>
          <form action="">
            {/* ... (rest of your code) */}

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">SSID</span>
              <input
                className={`block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input ${
                  ssidError ? "border-red-500" : ""
                }`}
                type="text"
                name="ssid"
                value={ssid}
                onChange={(e) => handleInputChange(e, setSSID)}
              />
              {ssidError && (
                <p className="mt-2 text-xs text-red-500" style={{ color: "red" }}>
                  {ssidError}
                </p>
              )}
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">Password</span>
              <input
                className={`block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input ${
                  passwordError ? "border-red-500" : ""
                }`}
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
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
