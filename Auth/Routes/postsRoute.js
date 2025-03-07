const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createPost, getPosts } = require("../posts");

router.post("/newpost", async (req, res) => {
  const { postHeader, postContent, communityId, postDate, token } = req.body;
  const id = jwt.verify(token, "your-secret-key");
  console.log(id);
  createPost(communityId, id.userId, postContent, postHeader, postDate);
  res.status(200).json({ token });
});

router.get("/getposts/:communityId", async (req, res) => {
  console.log(req.params.communityId);
  res.status(200).json(getPosts(req.params.communityId));
});

module.exports = router;
