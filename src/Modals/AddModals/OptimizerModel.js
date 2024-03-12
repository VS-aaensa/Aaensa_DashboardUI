import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OptimizerModel,clearAddOptimizerResponse } from "../../Slices/Enterprise/OptimizerSlice";

function OptimizerModels({ closeModal, Data }) {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [optimizerData, setOptimizerData] = useState({
    optimizerId: "",
    optimizerName: "",
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const GatewayId = window.localStorage.getItem("Gateway_id");

  // Function to handle input changes and log values to the console
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptimizerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const data = {
    GatewayId: GatewayId,
    OptimizerID: optimizerData.optimizerId.trim(),
    OptimizerName: optimizerData.optimizerName,
  };

  const { status, add_optimizerlist_response, add_optimizerlist_error, loading } = useSelector(
    (state) => state.optimizerSlice
  );
  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const handleAddClick = async () => {
    dispatch(OptimizerModel({ data, header }));
  };

  useEffect(() => {

    if (add_optimizerlist_error) {
      setErrorMessage(add_optimizerlist_error);
      setTimeout(() => {
        setErrorMessage([]);
      }, 3000);
    }

    if (add_optimizerlist_response.message === "Optimizer added successfully.") {
      // dispatch(clearAddOptimizerResponse());
      closeModal();
    }
  }, [add_optimizerlist_error, add_optimizerlist_response])

  return (
    <div
      className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    // onClick={closeModal}
    //   onKeyDown={closeModal}
    >
      <div
        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
        role="dialog"
        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking on it
      >
        <header className="flex justify-end">
          <button
            className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover:text-gray-700"
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
        </header>

        <div className="mt-4 mb-6">
          <form action="">
            <label className="block mt-4 text-sm w-full">
              <span className="text-gray-700 dark:text-gray-400">
                Gateway Id
              </span>
              <span className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                {Data.GatewayId}
              </span>
            </label>

            <label className="block mt-4 text-sm w-full">
              <span className="text-gray-700 dark:text-gray-400">
                Optimizer Id
              </span>
              <input
                type="text"
                name="optimizerId"
                value={optimizerData.optimizerId}
                onChange={handleInputChange}
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Add Optimizer ID"
              />
              {errorMessage.key === "OptimizerID" && (
                <p className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}>
                  {errorMessage.message}
                </p>
              )}
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Enter Optimizer Name
              </span>
              <input
                type="text"
                name="optimizerName"
                value={optimizerData.optimizerName}
                onChange={handleInputChange}
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Add Optimizer Name"
              />
              {errorMessage.key === "OptimizerName" && (
                <p className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}>
                  {errorMessage.message}
                </p>
              )}
            </label>
          </form>
        </div>

        <button
          onClick={handleAddClick}
          className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default OptimizerModels;
