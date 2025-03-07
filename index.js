const express = require('express');
const cors = require('cors');
const { toggleLike, countLikes } = require('./likes');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('./posts');
const { getAllCommunities } = require('./communities'); 
// Import communities.js

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Important for handling JSON requests

// Debugging Log (Check If Functions Are Imported Correctly)
console.log("Imported community functions:", { getAllCommunities });

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to my server");
});

// GET: Retrieve all communities
app.get('/communities', (req, res) => {
    getAllCommunities((err, communities) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(communities);
    });
});


// Start the server
app.listen(Port, () => {
    console.log(`✅ Server is running on port: ${Port}`);
});
