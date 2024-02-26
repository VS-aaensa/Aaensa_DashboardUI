import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BYPASS} from "../../api/api";

export const Bypass = createAsyncThunk(
    "Bypass",
  
    async ({ data, header }, { rejectWithValue }) => {
      try {
       
        const response = await BYPASS(data, header);
        // console.log(response,"-----------------------------------------");
        return response.data;
      } catch (error) {
        console.log(error,"==================");
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
  
    bypass_response: "",
    bypass_error: null,
  
  };

  export const BypassSlice = createSlice({
    name: "EnterpriseSlice",
    initialState,
    reducers: {
      // Logout reducer
      clearError: (state) => {
        state.error = null;
      },
      //   clearState_list_error: (state) => {
      //     state.error = null;
      //   },
      clearResponse: (state) => {
        state.response = " ";
      },
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(Bypass.pending, (bypass, { payload }) => {
        // Add user to the state array
        bypass.status = "Loading...";
        bypass.loading = true;
      });
  
      builder.addCase(Bypass.fulfilled, (bypass, { payload }) => {
        // Add user to the state array
        bypass.status = "Success";
        bypass.loading = false;
        bypass.bypass_response = payload;
        bypass.bypass_error = null;
      });
      builder.addCase(Bypass.rejected, (bypass, { payload }) => {
        // Add user to the state array
        bypass.status = "Failed";
        bypass.loading = false;
        bypass.bypass_error = payload;
      });
    },
  });
  
  export default BypassSlice.reducer;