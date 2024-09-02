import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer from "./slices/updateProfileSlice";
import portfolioReducer from "./slices/portfolioSlice";
import agencyProfileReducer from './slices/agencyProfileSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer,
    applications: applicationReducer,
    updateProfile: updateProfileReducer,
    portfolio: portfolioReducer,
    agencyProfile: agencyProfileReducer,
  },
});

export default store;
