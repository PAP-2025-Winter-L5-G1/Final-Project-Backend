const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../posts");

router.post("/newpost", async (req, res) => {
  const { postHeader, postContent, communityId, userId, postDate, token } =
    req.body;
  createPost(communityId, userId, postContent, postHeader, postDate);
  res.status(200).json({ token });
});

router.get("/getposts/:communityId", async (req, res) => {
  res.status(200).json(getPosts(req.params.communityId));
});

module.exports = router;
