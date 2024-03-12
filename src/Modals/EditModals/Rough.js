import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EditGateway,
  clearEdit_gateway_response,
  clearEdit_gateway_error,
} from "../../Slices/Enterprise/GatewaySlice";

function GatewayEditModel({ closeModal, selectedItem, Data }) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [GatewayData, setGatewayData] = useState({
    SSID: selectedItem.NetworkSSID,
    PASS: selectedItem.NetworkPassword,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGatewayData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { status, edit_gateway_response, edit_gateway_error, loading } =
    useSelector((state) => state.gatewaySlice);
  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const LocationID = window.localStorage.getItem("Location_id");
  const data = {
    EnterpriseInfo: LocationID,
    OnboardingDate: selectedItem.OnboardingDate,
    GatewayID: selectedItem.GatewayID,
    NetworkSSID: GatewayData.SSID,
    NetworkPassword: GatewayData.PASS,
    EnterpriseUserID: selectedItem.EnterpriseUserID,
  };

  const GatewayId = selectedItem._id;

  const setSSIDPASS = () => {
    dispatch(EditGateway({ GatewayId, data, header }));
  };

  const toggleEditMode = () => {
    // Show alert before enabling edit mode
    const userConfirmed = window.confirm("Are you sure you want to edit?");
    if (userConfirmed) {
      setEditMode(!editMode);
    }
  };

  useEffect(() => {
    if (edit_gateway_response.message === "Gateway updated successfully.") {
      dispatch(clearEdit_gateway_response());
      closeModal();
    }
    if (edit_gateway_error) {
      setErrorMessage(edit_gateway_error);
      setTimeout(() => {
        setErrorMessage([]);
      }, 2000);
      dispatch(clearEdit_gateway_error());
    }
  }, [edit_gateway_response, edit_gateway_error]);

  return (
    <div
      style={{ maxHeight: "auto", overflowY: "auto" }}
      className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
      >
        <div className="mt-4 mb-6">
          <p>dashboard</p>
          <form action="">
            {/* ...Other form fields */}
            {editMode ? (
              <>
                {/* Editable SSID field */}
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">SSID</span>
                  <input
                    type="text"
                    name="SSID"
                    value={GatewayData.SSID}
                    onChange={handleInputChange}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Edit SSID"
                  />
                  {errorMessage.key === "NetworkSSID" && (
                    <p
                      className="mt-2 text-xs text-red-500"
                      style={{ color: "red" }}
                    >
                      {errorMessage.message}
                    </p>
                  )}
                </label>

                {/* Editable Password field */}
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <input
                    type="text"
                    name="PASS"
                    value={GatewayData.PASS}
                    onChange={handleInputChange}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Edit Password"
                  />
                  {errorMessage.key === "NetworkPassword" && (
                    <p
                      className="mt-2 text-xs text-red-500"
                      style={{ color: "red" }}
                    >
                      {errorMessage.message}
                    </p>
                  )}
                </label>
              </>
            ) : (
              <>
                {/* Non-editable SSID field */}
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">SSID</span>
                  <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                    {GatewayData.SSID}
                  </span>
                </label>

                {/* Non-editable Password field */}
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                    {GatewayData.PASS}
                  </span>
                </label>
              </>
            )}
          </form>
        </div>
        <button
          className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          onClick={setSSIDPASS}
        >
          Add
        </button>

        {/* Button to toggle edit mode */}
        <button
          className="mt-4 w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={toggleEditMode}
        >
          {editMode ? "Cancel Edit" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default GatewayEditModel;
