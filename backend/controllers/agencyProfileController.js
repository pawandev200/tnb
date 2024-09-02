import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import  AgencyProfile  from "../models/agencyProfile.js";
import { v2 as cloudinary } from "cloudinary";

// // Create or Update an Agency Profile: just for testing purposes  
// export const createOrUpdateAgencyProfile = async (req, res) => {
//   try {
//     const { user, agencyName, agencyLogo, description, address } = req.body;
//     console.log(req.body);
    
//     // Check if an agency profile already exists for this user
//     let profile = await AgencyProfile.findOne({ user });

//     if (profile) {
//       // Update the existing profile
//       profile.agencyName = agencyName;
//       profile.agencyLogo = agencyLogo;
//       profile.description = description;
//       profile.address = address;

//       const updatedProfile = await profile.save();

//       return res.status(200).json({
//         message: 'Agency profile updated successfully',
//         profile: updatedProfile,
//       });
//     } else {
//       // Create a new profile
//       const newAgencyProfile = new AgencyProfile({
//         user,
//         agencyName,
//         agencyLogo,
//         description,
//         address,
//       });

//       const savedProfile = await newAgencyProfile.save();

//       return res.status(201).json({
//         message: 'Agency profile created successfully',
//         profile: savedProfile,
//       });
//     }
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({
//       message: 'Error creating or updating agency profile',
//       error: error.message,
//     });
//   }
// };


// Create or Update an Agency Profile: all are here except for the image and logo
export const createOrUpdateAgencyProfile = async (req, res) => {
    try {
        const {
            user,
            agencyName,
            slogan,
            location,
            agencyOverview,
            numberOfEmployees,
            // budgetRange,
            minBudget,
            maxBudget,
            servicesOffered,
            expertise,
            industries,
            portfolio,
            pastClients,
            awards,
            yearFounded,
        } = req.body;

        console.log(req.body);

        // Convert minBudget and maxBudget to numbers
        const budgetRange = {
          minBudget: Number(minBudget),
          maxBudget: Number(maxBudget),
      };

      console.log('Budget Range:', budgetRange);

        // Check if an agency profile already exists for this user
        let profile = await AgencyProfile.findOne({ user });

        if (profile) {
            // Update the existing profile
            profile.agencyName = agencyName;
            profile.slogan = slogan;
            profile.location = location;
            profile.agencyOverview = agencyOverview;
            profile.numberOfEmployees = numberOfEmployees;
            profile.budgetRange = budgetRange;
            profile.servicesOffered = servicesOffered;
            profile.expertise = expertise;
            profile.industries = industries;
            profile.portfolio = portfolio;
            profile.pastClients = pastClients;
            profile.awards = awards;
            profile.yearFounded = yearFounded;

            const updatedProfile = await profile.save();
            return res.status(200).json({
                message: 'Agency profile updated successfully',
                profile: updatedProfile,
            });
        } else {
            // Create a new profile
            const newAgencyProfile = new AgencyProfile({
                user,
                agencyName,
                slogan,
                location,
                agencyOverview,
                numberOfEmployees,
                budgetRange,
                servicesOffered,
                expertise,
                industries,
                portfolio,
                pastClients,
                awards,
                yearFounded,
            });

            const savedProfile = await newAgencyProfile.save();
            return res.status(201).json({
                message: 'Agency profile created successfully',
                profile: savedProfile,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating or updating agency profile',
            error: error.message,
        });
    }
};



// with file uploads

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const createOrUpdateAgencyProfile = async (req, res) => {
//   try {
//     const {
//       user,
//       agencyName,
//       slogan,
//       location,
//       agencyOverview,
//       numberOfEmployees,
//       minBudget,
//       maxBudget,
//       servicesOffered,
//       expertise,
//       industries,
//       portfolio,
//       pastClients,
//       awards,
//       yearFounded,
//     } = req.body;

//     console.log(req.body);

//     // Convert minBudget and maxBudget to numbers
//     const budgetRange = {
//       minBudget: Number(minBudget),
//       maxBudget: Number(maxBudget),
//     };

//     console.log('Budget Range:', budgetRange);

//     // Handle logo upload
//     let logoUrl = '';
//     if (req.files && req.files.logo) {
//       const logoUpload = await cloudinary.v2.uploader.upload(req.files.logo[0].path);
//       logoUrl = logoUpload.secure_url;
//     } else {
//       // Handle the case where logo is required but not provided
//       return res.status(400).json({
//         message: 'Logo is required',
//       });
//     }

//     // Handle portfolio images if provided
//     const portfolioWithImages = portfolio ? await Promise.all(
//       portfolio.map(async (item) => {
//         let imageUrl = item.image;
//         if (item.image && item.image.startsWith('data:')) {
//           const imageUpload = await cloudinary.v2.uploader.upload(item.image);
//           imageUrl = imageUpload.secure_url;
//         }
//         return {
//           image: imageUrl,  // Ensure image is updated
//           challenge: item.challenge,
//           plan: item.plan,
//           result: item.result,
//           link: item.link,
//         };
//       })
//     ) : [];

//     // Check if an agency profile already exists for this user
//     let profile = await AgencyProfile.findOne({ user });

//     if (profile) {
//       // Update the existing profile
//       profile.agencyName = agencyName;
//       profile.slogan = slogan;
//       profile.location = location;
//       profile.agencyOverview = agencyOverview;
//       profile.numberOfEmployees = numberOfEmployees;
//       profile.budgetRange = budgetRange;
//       profile.servicesOffered = servicesOffered;
//       profile.expertise = expertise;
//       profile.industries = industries;
//       profile.pastClients = pastClients;
//       profile.awards = awards;
//       profile.yearFounded = yearFounded;
//       profile.logo = logoUrl;  // Ensure logo is updated

//       // Update portfolio
//       if (portfolioWithImages.length > 0) {
//         profile.portfolio = portfolioWithImages;
//       }

//       const updatedProfile = await profile.save();
//       return res.status(200).json({
//         message: 'Agency profile updated successfully',
//         profile: updatedProfile,
//       });
//     } else {
//       // Create a new profile
//       const newAgencyProfile = new AgencyProfile({
//         user,
//         agencyName,
//         slogan,
//         location,
//         agencyOverview,
//         numberOfEmployees,
//         budgetRange,
//         servicesOffered,
//         expertise,
//         industries,
//         pastClients,
//         awards,
//         yearFounded,
//         logo: logoUrl,  // Ensure logo is set
//         portfolio: portfolioWithImages,
//       });

//       const savedProfile = await newAgencyProfile.save();
//       return res.status(201).json({
//         message: 'Agency profile created successfully',
//         profile: savedProfile,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: 'Error creating or updating agency profile',
//       error: error.message,
//     });
//   }
// };





// Get Agency Profile by User ID
export const getAgencyProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await AgencyProfile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({
        message: 'Agency profile not found',
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving agency profile',
      error: error.message,
    });
  }
};

// Get All Agency Profiles
export const getAllAgencyProfiles = async (req, res) => {
  try {
    const profiles = await AgencyProfile.find();

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving agency profiles',
      error: error.message,
    });
  }
};
