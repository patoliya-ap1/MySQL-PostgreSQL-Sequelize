import express from "express";
import {
  getTechPosts,
  searchPosts,
  rankUsers,
  topPosts,
  previousPosts,
} from "../../controller/social/analyticController";

const router = express.Router();

router.get("/tech-posts", getTechPosts);
router.get("/search", searchPosts);
router.get("/rank-users", rankUsers);
router.get("/top-posts", topPosts);
router.get("/previous-posts", previousPosts);

export default router;
