import express from "express";
import {
  getTechPosts,
  searchPosts,
  rankUsers,
  topPosts,
  previousPosts,
} from "../../controller/social-analytics/analyticController";

export const analyticsRouter = express.Router();

analyticsRouter.get("/tech-posts", getTechPosts);
analyticsRouter.get("/search", searchPosts);
analyticsRouter.get("/rank-users", rankUsers);
analyticsRouter.get("/top-posts", topPosts);
analyticsRouter.get("/previous-posts", previousPosts);
