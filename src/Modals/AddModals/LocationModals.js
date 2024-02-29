
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  locationModel,
  clearAddLoctation_response,
  clearAddLoctation_error,
} from "../../Slices/Enterprise/LocationSlice";


function LocationModals({ closeModal }) {
  const dispatch = useDispatch();
  const [errorlog, setErrorLog] = useState([]);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const token = window.localStorage.getItem("token"); //token


  const { status, add_locationlist_response, add_locationlist_error, loading } =
    useSelector((state) => state.locationSlice);

  
  const StateId = window.localStorage.getItem("State_Id");
  const EnterpriseId = window.localStorage.getItem("Enterprise_Id");
  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleInputChange1 = (event) => {
    setAddress(event.target.value);
  };

  const data = {
    Enterprise_ID: EnterpriseId,
    State_ID: StateId,
    LocationName: location,

    Address: address,
  };

  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  async function AddLocation() {
    dispatch(locationModel({ data, header }));

  }
  useEffect(() => {
    if (add_locationlist_error) {
      setErrorLog(add_locationlist_error);
      setTimeout(() => {
        setErrorLog([]);
      }, 3000);
      dispatch(clearAddLoctation_error());
    }

    if (
      add_locationlist_response.message ==
      "Enterprise Location added successfully."
    ) {
      dispatch(clearAddLoctation_response());
      closeModal();
    }
  }, [dispatch, add_locationlist_error, add_locationlist_response]);


  return (
    <div
      onClick={closeModal}
      // onKeyDown={closeModal}
      className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
        role="dialog"
        id="modal"
      >
        <header className="flex justify-end">
          <button
            onClick={closeModal}
            className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover:hover:text-gray-700"
            aria-label="close"
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
            <label className="block mt-4 text-sm ">
              <span className="text-gray-700 dark:text-gray-400">
                Location Name
              </span>
              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                name="location"
                value={location}
                onChange={handleInputChange}
              />
              {errorlog.key === "LocationName" && (

                <p
                  className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}
                >

                  {errorlog.message}
                </p>
              )}
            </label>
            <label className="block mt-4 text-sm ">
              <span className="text-gray-700 dark:text-gray-400">
                Location Address
              </span>
              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                name="address"
                value={address}
                onChange={handleInputChange1}
              />
              {errorlog.key === "Address" && (

                <p
                  className="mt-2 text-xs text-red-500"
                  style={{ color: "red" }}
                >

                  {errorlog.message}
                </p>
              )}
            </label>
          </form>
        </div>
        <button
          onClick={AddLocation}

          className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >

          Add
        </button>
      </div>
    </div>

  );

}

export default LocationModals;
