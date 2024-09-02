// controllers/portfolioController.js
import { Portfolio } from "../models/portfolioSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";

// Create Portfolio
export const createPortfolio = catchAsyncErrors(async (req, res, next) => {
  const { projectTitle, projectDescription, projectLink, projectDate, skills } = req.body;

  if (!projectTitle || !projectDescription || !projectDate || !skills) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  let images = [];

  if (req.files && req.files.images) {
    const files = req.files.images;
    for (let file of files) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Portfolio_Images",
      });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  const portfolio = await Portfolio.create({
    user: req.user.id,
    projectTitle,
    projectDescription,
    projectLink,
    projectDate,
    skills,
    images,
  });

  res.status(201).json({
    success: true,
    portfolio,
  });
});

// Get Portfolio
export const getPortfolio = catchAsyncErrors(async (req, res, next) => {
  const portfolio = await Portfolio.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// Update Portfolio
export const updatePortfolio = catchAsyncErrors(async (req, res, next) => {
  let portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return next(new ErrorHandler("Portfolio not found.", 404));
  }

  const { projectTitle, projectDescription, projectLink, projectDate, skills } = req.body;

  portfolio.projectTitle = projectTitle || portfolio.projectTitle;
  portfolio.projectDescription = projectDescription || portfolio.projectDescription;
  portfolio.projectLink = projectLink || portfolio.projectLink;
  portfolio.projectDate = projectDate || portfolio.projectDate;
  portfolio.skills = skills || portfolio.skills;

  if (req.files && req.files.images) {
    for (let img of portfolio.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    let images = [];
    for (let file of req.files.images) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Portfolio_Images",
      });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    portfolio.images = images;
  }

  await portfolio.save();

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// Delete Portfolio
export const deletePortfolio = catchAsyncErrors(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return next(new ErrorHandler("Portfolio not found.", 404));
  }

  for (let img of portfolio.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  await portfolio.remove();

  res.status(200).json({
    success: true,
    message: "Portfolio deleted successfully.",
  });
});
