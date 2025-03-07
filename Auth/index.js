const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/auth");
const postRoutes = require("./Routes/postsRoute");
const commentRoutes = require("./Routes/commentsRoute");

const { toggleLike, countLikes } = require("./likes");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("./posts");
const { getAllCommunities } = require("./communities");

const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the JWT Auth");
});

app.get("/communities", (req, res) => {
  getAllCommunities((err, communities) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(communities);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
