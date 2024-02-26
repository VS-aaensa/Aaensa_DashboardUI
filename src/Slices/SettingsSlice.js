import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SET, RESET,ENTERPRISETABLE,STATETABLE,LOCATIONTABLE,GATEWAYTABLE,OPTIMIZERTABLE} from "../api/api";

export const Set = createAsyncThunk(
    "Set",
  
    async ({ data, header }, { rejectWithValue }) => {
      try {
        const response = await SET(data, header);
        console.log(response.data,"-----------------------------------------");
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

  export const Reset = createAsyncThunk(
    "Reset",
  
    async ({ Data, header }, { rejectWithValue }) => {
      try {
        const response = await RESET(Data, header);
        // console.log(response.data,"-----------------------------------------");
        return response.data;
      } catch (error) {
        // console.log(error,"==================");
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

  export const Customer = createAsyncThunk(
    "Customer",
  
    async ({header }, { rejectWithValue }) => {
      try {
        const response = await ENTERPRISETABLE( header);
        // console.log(response.data,"-----------------------------------------");
        return response.data;
      } catch (error) {
        // console.log(error,"==================");
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

  export const State = createAsyncThunk(
    "State",
  
    async ({EnterpriseId,header }, { rejectWithValue }) => {
      try {
        const response = await STATETABLE(EnterpriseId, header);
        // console.log(response.data,"-----------------------------------------");
        return response.data;
      } catch (error) {
        // console.log(error,"==================");
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

  export const Location = createAsyncThunk(
    "Location",
  
    async ({EnterpriseId,StateId,header }, { rejectWithValue }) => {
      try {
        const response = await LOCATIONTABLE(EnterpriseId,StateId, header);
        // console.log(response.data,"-----------------------------------------");
        return response.data;
      } catch (error) {
        // console.log(error,"==================");
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

  export const Gateway = createAsyncThunk(
    "Gateway",
  
    async ({LocationId,header }, { rejectWithValue }) => {
      try {
        const response = await GATEWAYTABLE(LocationId, header);
        // console.log(response.data,"-----------------------------------------");
        return response.data;
      } catch (error) {
        // console.log(error,"==================");
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

  export const Optimizer = createAsyncThunk(
    "Optimizer",
  
    async ({header }, { rejectWithValue }) => {
      try {
        const response = await OPTIMIZERTABLE( header);
        // console.log(response.data,"-----------------------------------------");
        return response.data;
      } catch (error) {
        // console.log(error,"==================");
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
  
    add_set_response: "",
    add_set_error: null,
  
    add_reset_response: "",
    add_reset_error: null,
  };

  export const SettingSlice = createSlice({
    name: "EnterpriseSlice",
    initialState,
    reducers: {
      // Logout reducer
      clearError: (state) => {
        state.add_reset_error = null;
        state.add_set_error = null;
      },
      //   clearState_list_error: (state) => {
      //     state.error = null;
      //   },
      clearResponse: (state) => {
        state.add_reset_response = " ";
        state.add_set_response = " ";
      },
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(Set.pending, (set, { payload }) => {
        // Add user to the state array
        set.status = "Loading...";
        set.loading = true;
      });
  
      builder.addCase(Set.fulfilled, (set, { payload }) => {
        // Add user to the state array
        set.status = "Success";
        set.loading = false;
        set.add_set_response = payload;
        set.add_set_error = null;
      });
      builder.addCase(Set.rejected, (set, { payload }) => {
        // Add user to the state array
        set.status = "Failed";
        set.loading = false;
        set.add_set_error = payload;
      });
  // -----------------------------------------------------------------------------------------------
      builder.addCase(Reset.pending, (reset, { payload }) => {
        // Add user to the state array
        reset.status = "Loading...";
        reset.loading = true;
      });
  
      builder.addCase(Reset.fulfilled, (reset, { payload }) => {
        // Add user to the state array
        reset.status = "Success";
        reset.loading = false;
        reset.add_reset_response = payload;
        reset.add_reset_error = null;
      });
      builder.addCase(Reset.rejected, (reset, { payload }) => {
        // Add user to the state array
        reset.status = "Failed";
        reset.loading = false;
        reset.add_reset_error = payload;
      });
    },
  });
  
  export default SettingSlice.reducer;