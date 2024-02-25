const express = require("express");
const {
  sendJobApplicationController,
  getJobApplicationsController,
  rejectJobApplicationController,
} = require("./jobApplication.controller");
const authorizeUser = require("../../middleware/jwtAuth");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Send job application

router.post(
  "/jobApplication/sendJobApplication",
  upload.single("resume"),
  sendJobApplicationController
);

// Get all job applications by job id

router.get(
  "/jobApplication/getJobApplications",
  authorizeUser,
  getJobApplicationsController
);

// Reject job application

router.delete(
  "/jobApplication/deleteJobApplication/:applicationId",
  authorizeUser,
  rejectJobApplicationController
);

module.exports = router;
