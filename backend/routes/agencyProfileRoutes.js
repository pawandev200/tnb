
import express from "express";
import {
  createOrUpdateAgencyProfile,
  getAgencyProfileByUserId,
} from "../controllers/agencyProfileController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllAgencyProfiles } from "../controllers/agencyProfileController.js";

const router = express.Router();

// router.post("/", isAuthenticated, createOrUpdateAgencyProfile);
router.post("/", createOrUpdateAgencyProfile);
router.get("/:userId", getAgencyProfileByUserId);
router.get("/", getAllAgencyProfiles);    // /api/agency/profile
           
export default router;




// import express from "express";
// import {
//   createOrUpdateAgencyProfile,
//   getAgencyProfileByUserId,
//   getAllAgencyProfiles,
// } from "../controllers/agencyProfileController.js";
// import { isAuthenticated } from "../middlewares/auth.js"; // Ensure this is correctly implemented
// import multer from "multer";
// // Configure multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// const router = express.Router();

// // Use authentication middleware if required
// // Uncomment the following line if authentication is needed
// // router.post("/", isAuthenticated, upload.fields([{ name: 'logo' }, { name: 'portfolioImages' }]), createOrUpdateAgencyProfile);
// router.post("/", upload.fields([{ name: 'logo' }, { name: 'portfolioImages' }]), createOrUpdateAgencyProfile);
// router.get("/:userId", getAgencyProfileByUserId);
// router.get("/", getAllAgencyProfiles); // /api/agency/profile

// export default router;
