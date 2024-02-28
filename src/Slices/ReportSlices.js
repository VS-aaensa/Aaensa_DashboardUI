import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { METERDATA,DEVICEDATA } from "../api/api";

export const MeterData = createAsyncThunk(
  "MeterData",
  async ({currentPage, data, header }, { rejectWithValue }) => {
    try {
      const response = await METERDATA(currentPage, data, header);
      return response.data;
    } catch (error) {
      if (
        error.response.data.message === "Invalid token" ||
        error.response.data.message === "Access denied"
      ) {
        window.localStorage.clear();
        window.location.href = "./";
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeviceData = createAsyncThunk(
  "DeviceData",


  async ({ currentPage,data, header }, { rejectWithValue }) => {

    try {
      const response = await DEVICEDATA(currentPage,data, header);
      return response.data;
    } catch (error) {
      if (
        error.response.data.message === "Invalid token" ||
        error.response.data.message === "Access denied"
      ) {
        window.localStorage.clear();
        window.location.href = "./";
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "",
  loading: false,

  meterData_response: "",
  meterData_error: null,
 

  deviceData_response: "",
  deviceData_error: null,
};

export const ReportSlice = createSlice({
  name: "ReportSlice",
  initialState,
  reducers: {
    // Logout reducer
    clearmeterDataError: (state) => {
      state.meterData_error = null;
    },
    clearmeterDataResponse: (state) => {
      state.meterData_response = " ";
    },
    cleardeviceData_response: (state) => {
      state.deviceData_response = " ";
    },
    cleardeviceData_error: (state) => {
      state.deviceData_error = null;
    },
    
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(MeterData.pending, (report, { payload }) => {
      // Add user to the state array
      report.status = "Loading...";
      report.loading = true;
    });

    builder.addCase(MeterData.fulfilled, (report, { payload }) => {
      // Add user to the state array
      report.status = "Success";
      report.loading = false;
      report.meterData_response = payload;
      report.meterData_error = null;
    });
    builder.addCase(MeterData.rejected, (report, { payload }) => {
      // Add user to the state array
      report.status = "Failed";
      report.loading = false;
      report.meterData_error = payload;
    });

    // DEVICE ------------------------------------------------------------------
    builder.addCase(DeviceData.pending, (state, { payload }) => {
      // Add user to the state array
      state.status = "Loading...";
      state.loading = true;
    });

    builder.addCase(DeviceData.fulfilled, (state, { payload }) => {
      // Add user to the state array
      state.status = "Success";
      state.loading = false;
      state.deviceData_response = payload;
      state.deviceData_error = null;
    });
    builder.addCase(DeviceData.rejected, (state, { payload }) => {
      // Add user to the state array
      state.status = "Failed";
      state.loading = false;
      state.deviceData_error = payload;
    });
  },
});

export const {  cleardeviceData_response, cleardeviceData_error,clearmeterDataError,clearmeterDataResponse } = ReportSlice.actions;

export default ReportSlice.reducer;