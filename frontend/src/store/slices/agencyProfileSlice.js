import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API
const API_URL = "http://localhost:4000/api/agency/profile";

// Async thunk to fetch a single agency profile by userId
export const getAgencyProfile = createAsyncThunk(
  "agencyProfile/getAgencyProfile",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/${userId}`);
      return data; // Assuming the entire profile object is returned directly
    } catch (error) {
      console.log(error.message);
      
      return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to fetch agency profile");
    }
  }
);

// Async thunk to fetch all agencies
export const getAllAgencies = createAsyncThunk(
  "agencyProfile/getAllAgencies",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL);
      return data; // Assuming the list of agencies is returned directly
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to fetch agencies");
    }
  }
);

// Async thunk to create or update an agency profile
export const createOrUpdateAgencyProfile = createAsyncThunk(
  "agencyProfile/createOrUpdateAgencyProfile",
  async (profileData, thunkAPI) => {
    try {
      const { data } = await axios.post(API_URL, profileData, {
        headers: {
          'Content-Type': 'application/json', // Sending JSON payload
          // 'Content-Type': 'multipart/form-data',
        },
      });
      return data; // Assuming the entire profile object is returned directly
    } catch (error) {
      console.log(error.message);   
      return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to create or update agency profile");
    }
  }
);



// // Async thunk to create or update an agency profile
// export const createOrUpdateAgencyProfile = createAsyncThunk(
//   'agencyProfile/createOrUpdateAgencyProfile',
//   async (profileData, thunkAPI) => {
//     try {
//       const formData = new FormData();

//       // Append all fields to FormData
//       Object.keys(profileData).forEach((key) => {
//         if (key === 'logoFile') {
//           if (profileData[key]) formData.append('logo', profileData[key]);
//         } else if (key === 'imageFiles') {
//           profileData[key].forEach((file, index) => {
//             formData.append(`portfolioImages[${index}]`, file);
//           });
//         } else {
//           formData.append(key, profileData[key]);
//         }
//       });

//       const { data } = await axios.post(API_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Ensure proper content type for form data
//         },
//       });

//       return data; // Assuming the entire profile object is returned directly
//     } catch (error) {
//       console.log(error.message);
//       return thunkAPI.rejectWithValue(error.response?.data.message || 'Failed to create or update agency profile');
//     }
//   }
// );


const agencyProfileSlice = createSlice({
  name: "agencyProfile",
  initialState: {
    agencyProfile: null,
    agencies: [], // Store all agencies
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling getAgencyProfile
      .addCase(getAgencyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAgencyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.agencyProfile = action.payload; // Directly setting profile object
      })
      .addCase(getAgencyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling getAllAgencies
      .addCase(getAllAgencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.agencies = action.payload; // Directly setting list of agencies
      })
      .addCase(getAllAgencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling createOrUpdateAgencyProfile
      .addCase(createOrUpdateAgencyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateAgencyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.agencyProfile = action.payload; // Directly setting profile object
      })
      .addCase(createOrUpdateAgencyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default agencyProfileSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Base URL for API
// const API_URL = "http://localhost:4000/api/agency/profile";

// // Async thunk to fetch a single agency profile by userId
// export const getAgencyProfile = createAsyncThunk(
//   "agencyProfile/getAgencyProfile",
//   async (userId, thunkAPI) => {
//     try {
//       const { data } = await axios.get(`${API_URL}/${userId}`);
//       return data; // Assuming the entire profile object is returned directly
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to fetch agency profile");
//     }
//   }
// );

// // Async thunk to fetch all agencies
// export const getAllAgencies = createAsyncThunk(
//   "agencyProfile/getAllAgencies",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get(API_URL);
//       return data; // Assuming the list of agencies is returned directly
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to fetch agencies");
//     }
//   }
// );

// // Async thunk to create or update an agency profile
// export const createOrUpdateAgencyProfile = createAsyncThunk(
//   "agencyProfile/createOrUpdateAgencyProfile",
//   async (profileData, thunkAPI) => {
//     try {
//       const { data } = await axios.post(API_URL, profileData, {
//         headers: {
//           'Content-Type': 'application/json', // No file uploads needed
//         },
//       });
//       return data; // Assuming the entire profile object is returned directly
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.response?.data.message || "Failed to create or update agency profile");
//     }
//   }
// );

// const agencyProfileSlice = createSlice({
//   name: "agencyProfile",
//   initialState: {
//     agencyProfile: null,
//     agencies: [], // Store all agencies
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handling getAgencyProfile
//       .addCase(getAgencyProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAgencyProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.agencyProfile = action.payload; // Directly setting profile object
//       })
//       .addCase(getAgencyProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handling getAllAgencies
//       .addCase(getAllAgencies.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllAgencies.fulfilled, (state, action) => {
//         state.loading = false;
//         state.agencies = action.payload; // Directly setting list of agencies
//       })
//       .addCase(getAllAgencies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handling createOrUpdateAgencyProfile
//       .addCase(createOrUpdateAgencyProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createOrUpdateAgencyProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.agencyProfile = action.payload; // Directly setting profile object
//       })
//       .addCase(createOrUpdateAgencyProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default agencyProfileSlice.reducer;
