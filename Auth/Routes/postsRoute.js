const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createPost, getPosts, getPostById } = require("../posts");

router.post("/newpost", async (req, res) => {
  const { postHeader, postContent, postCreator, communityId, postDate, token } =
    req.body;
  if (!token) {
    res.status(403).json();
    return;
  }
  const id = jwt.verify(token, "your-secret-key");
  createPost(
    communityId,
    id.userId,
    postContent,
    postCreator,
    postHeader,
    postDate
  );
  res.status(200).json({ token });
});

router.get("/getposts/:communityId", async (req, res) => {
  res.status(200).json(await getPosts(req.params.communityId));
});

router.get("/getposts", async (req, res) => {
  res.status(200).json(await getPosts());
});

router.get("/getpostbyid/:postId", async (req, res) => {
  try {
    res.status(200).json(await getPostById(req.params.postId));
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
});
module.exports = router;
