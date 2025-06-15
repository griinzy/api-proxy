const express = require('express');
const router = express.Router();

const cacheDuration = 1800000; // 30 minutes
let cachedRes;
let cacheTimestamp = 0;

const username = process.env.GITHUB_USERNAME;

router.get('/commits/:repo', async (req, res) => {
    const repo = req.params.repo;

    const now = Date.now();

    if(cachedRes && (now - cacheTimestamp) < cacheDuration) {
        return res.json(cachedRes);
    }

    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);

    if(!response.ok) {
        return res.status(response.status).json({error: 'GitHub API error'});
    }

    const data = await response.json();

    cachedRes = data;
    cacheTimestamp = now;

    res.json(data);
})

module.exports = router;