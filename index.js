const express = require('express');
const cors = require('cors');
const { toggleLike, countLikes } = require('./likes');

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Important for POST requests

// ✅ Home route to check if the server is running
app.get('/', (req, res) => {
    res.send("Welcome to my server");
});

// ✅ POST: Toggle Like (Add/Remove Like)
app.post('/like', (req, res) => {
    const { userId, postId, commentId } = req.body;

    if (!userId || (!postId && !commentId)) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    toggleLike(userId, postId, commentId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// ✅ GET: Get Like Count
app.get('/likes/count', (req, res) => {
    const { postId, commentId } = req.query;

    if (!postId && !commentId) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    countLikes(postId, commentId, (err, count) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ likeCount: count });
    });
});

// ✅ Start the server
app.listen(Port, () => {
    console.log(`✅ Server is running on port: ${Port}`);
});
