const express = require("express");
const {
  addJob,
  editJob,
  deleteJob,
  getAllJobs,
  getJobById,
} = require("./job.controller");
const router = express.Router();
const authorizeUser = require("../../middleware/jwtAuth");

router.post("/job/addJob", authorizeUser, addJob);
router.patch("/job/editJob/:id", authorizeUser, editJob);
router.delete("/job/deleteJob/:id", authorizeUser, deleteJob);
router.get("/job/getAllJobs", authorizeUser, getAllJobs);
router.get("/job/getJobById/:id", authorizeUser, getJobById);

module.exports = router;
