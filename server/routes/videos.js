import express from "express";
import {
  addVideo,
  addViews,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// add video
router.post("/", verifyToken, addVideo);
// update video
router.put("/:id", verifyToken, updateVideo);
// delete video
router.delete("/:id", verifyToken, deleteVideo);
// get video
router.get("/find/:id", getVideo);

// update video views
router.put("/views/:id", addViews);

// get trend videos
router.get("/trend", trend);

// get random videos
router.get("/random", random);

// get subscribed videos
router.get("/sub", verifyToken, sub);

// get video by tags
router.get("/tags", getByTag);

// search videos
router.get("/search", search);

export default router;
