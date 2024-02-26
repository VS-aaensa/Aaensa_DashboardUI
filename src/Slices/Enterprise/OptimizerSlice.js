import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  OPTIMIZERTABLE,
  ADDOPTIMIZER,
  OPTIMIZERDETAILS,
  EDITOPTIMIZER,
} from "../../api/api";

export const OptimizerList = createAsyncThunk(

  "OptimizerList",

  async ({ GatewayId, header }, { rejectWithValue }) => {
    try {
      const response = await OPTIMIZERTABLE(GatewayId, header);
      console.log(response.data, "-----------------------------------------");
      return response.data;
    } catch (error) {
      // console.log(error, "==================");
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

export const OptimizerModel = createAsyncThunk(
  "OptimizerModel",

  async ({ data, header }, { rejectWithValue }) => {
    try {
      const response = await ADDOPTIMIZER(data, header);
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

export const OptimizerDetails = createAsyncThunk(
  "OptimizerDetails",

  async ({ optimizerId, header }, { rejectWithValue }) => {
    try {
      const response = await OPTIMIZERDETAILS(optimizerId, header);
      return response.data;
    } catch (error) {
      console.log(error, "==================");
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

export const EditOptimizer = createAsyncThunk(
  "EditOptimizer",

  async ({ OptimizerId, data, header }, { rejectWithValue }) => {
    try {
      const response = await EDITOPTIMIZER(OptimizerId, data, header);
      console.log(response.data, "-----------------------------------------");
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

  optimizer_response: "",
  optimizer_error: null,

  add_optimizer_response: "",
  add_optimizer_error: null,

  add_optimizerlist_response: "",
  add_optimizerlist_error: null,

  edit_optimizer_response: "",
  edit_optimizer_error: null,
};

export const optimizerSlice = createSlice({
  name: "EnterpriseSlice",
  initialState,
  reducers: {
    // Logout reducer
    clearError: (state) => {
      state.optimizer_error = null;

    },
    clearEditOptimizerResponse: (state) => {
      state.edit_optimizer_response = "";
    },
    clearOptimizerResponse: (state) => {
      state.optimizer_response = "";
    },
    clearAddOptimizerResponse: (state) => {
      state.add_optimizerlist_response = "";

    },

    clearAdd_optimizer_response: (state) => {
      state.add_optimizer_response = "";
    },
    clearAdd_optimizer_error: (state) => {
      state.add_optimizer_error = "";

    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(OptimizerList.pending, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Loading...";
      optimizer.loading = true;
    });

    builder.addCase(OptimizerList.fulfilled, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Success";
      optimizer.loading = false;
      optimizer.optimizer_response = payload;
      optimizer.optimizer_error = null;
    });
    builder.addCase(OptimizerList.rejected, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Failed";
      optimizer.loading = false;
      optimizer.optimizer_error = payload;
    });
    //   ------------------------------------------------------------------------------------------------
    builder.addCase(OptimizerModel.pending, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Loading...";
      optimizer.loading = true;
    });

    builder.addCase(OptimizerModel.fulfilled, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Success";
      optimizer.loading = false;
      optimizer.add_optimizerlist_response = payload;
      optimizer.add_optimizerlist_error = null;
    });
    builder.addCase(OptimizerModel.rejected, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Failed";
      optimizer.loading = false;
      optimizer.add_optimizerlist_error = payload;
    });

    //------------------------------------------------------------------------------------------
    builder.addCase(EditOptimizer.pending, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Loading...";
      optimizer.loading = true;
    });

    builder.addCase(EditOptimizer.fulfilled, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Success";
      optimizer.loading = false;
      optimizer.edit_optimizer_response = payload;
      optimizer.edit_optimizer_error = null;
    });
    builder.addCase(EditOptimizer.rejected, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Failed";
      optimizer.loading = false;
      optimizer.edit_optimizer_error = payload;
    });



    builder.addCase(OptimizerDetails.pending, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Loading...";
      optimizer.loading = true;
    });

    builder.addCase(OptimizerDetails.fulfilled, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Success";
      optimizer.loading = false;
      optimizer.add_optimizer_response = payload;
      optimizer.add_optimizer_error = null;
    });
    builder.addCase(OptimizerDetails.rejected, (optimizer, { payload }) => {
      // Add user to the state array
      optimizer.status = "Failed";
      optimizer.loading = false;
      optimizer.add_optimizer_error = payload;
    });

    //-----------------------------------------------------------------------------------


  },
});

export const { clearAdd_optimizer_response,clearAdd_optimizer_error,clearError, clearOptimizerResponse, clearEditOptimizerResponse, clearAddOptimizerResponse } = optimizerSlice.actions;

export default optimizerSlice.reducer;