import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;  // Ensure cookies are sent with requests

// Thunks for asynchronous actions
export const createPortfolio = createAsyncThunk(
  "portfolio/create",
  async (portfolioData, { rejectWithValue }) => {
    try {
      console.log("Sending data to create portfolio:", portfolioData);

      const response = await axios.post("/api/v1/portfolio", portfolioData);

      console.log("Response from create portfolio:", response.data);
      return response.data.portfolio;
    } catch (error) {
      console.error("Error in createPortfolio:", error.response?.data || error.message);

      // Returning error details for further handling
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPortfolio = createAsyncThunk(
  "portfolio/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/portfolio");

      console.log("Response from get portfolio:", response.data);
      return response.data.portfolio;
    } catch (error) {
      console.error("Error in getPortfolio:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(`Sending data to update portfolio with id ${id}:`, data);

      const response = await axios.put(`/api/v1/portfolio/${id}`, data);

      console.log("Response from update portfolio:", response.data);
      return response.data.portfolio;
    } catch (error) {
      console.error("Error in updatePortfolio:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfolio/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`Sending request to delete portfolio with id ${id}`);

      await axios.delete(`/api/v1/portfolio/${id}`);

      console.log(`Portfolio with id ${id} deleted successfully`);
      return id;
    } catch (error) {
      console.error("Error in deletePortfolio:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    portfolios: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.portfolios.push(action.payload);
        state.loading = false;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.portfolios = action.payload;
        state.loading = false;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        const index = state.portfolios.findIndex((portfolio) => portfolio._id === action.payload._id);
        if (index !== -1) {
          state.portfolios[index] = action.payload;
        }
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.portfolios = state.portfolios.filter((portfolio) => portfolio._id !== action.payload);
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default portfolioSlice.reducer;
