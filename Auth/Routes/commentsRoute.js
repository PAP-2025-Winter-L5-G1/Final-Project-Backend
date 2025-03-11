const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { createComment, getCommentsByPost } = require("../comments");

router.post("/newcomment", async (req, res) => {
  const { postId, commentContent, commentCreator, commentDate, token } =
    req.body;
  if (!token) {
    res.status(403).json();
    return;
  }
  const id = jwt.verify(token, "your-secret-key");
  createComment(postId, id.userId, commentContent, commentCreator, commentDate);
  res.status(200).json({ token });
});

router.get("/getcomments/:postId", async (req, res) => {
  try {
    res.status(200).json(await getCommentsByPost(req.params.postId));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
