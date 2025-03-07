const express = require("express");
const router = express.Router();
const { createComment, getCommentsByPost } = require("../comments");

router.post("/newcomment", async (req, res) => {
  const { commentContent, postId, userId, commentDate, token } = req.body;
  createComment(postId, userId, commentContent, commentDate);
  res.status(200).json({ token });
});

router.get("/getcomments/:postId", async (req, res) => {
  res.status(200).json(getCommentsByPost(req.params.postId));
});

module.exports = router;
