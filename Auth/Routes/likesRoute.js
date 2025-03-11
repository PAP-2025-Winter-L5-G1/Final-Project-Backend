const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { toggleLike, countLikes, likeStatus } = require("../likes");

router.get("/count/:postId", async (req, res) => {
  const { postId } = req.params;
  res.status(200).json(await countLikes(postId));
});

router.get("/toggle/:postId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; //getting token from header
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const { userId } = jwt.verify(token, "your-secret-key");

    const result = await toggleLike(userId, req.params.postId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/toggle/:postId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; //getting token from header
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const { userId } = jwt.verify(token, "your-secret-key");

    const result = await toggleLike(userId, req.params.postId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/status/:postId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "no token" });
    }
    const { userId } = jwt.verify(token, "your-secret-key");
    const likeCount = await countLikes(req.params.postId);
    const userLiked = await likeStatus(userId, req.params.postId);

    res.status(200).json({ likeCount, userLiked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
