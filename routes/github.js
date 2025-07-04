const express = require('express');
const router = express.Router();

const cacheDuration = 1800000; // 30 minutes - saving the results so it only calls the api if more than 30 minutes have passed since the last update.
let cachedRes;
let cacheTimestamp = 0;

const username = process.env.GITHUB_USERNAME;

router.get('/commits/:repo', async (req, res) => {
    const repo = req.params.repo;

    const now = Date.now();

    if(cachedRes && (now - cacheTimestamp) < cacheDuration) {
        const cacheAge = now - cacheTimestamp;

        return res.json({
            cacheAge: Math.floor(cacheAge / 1000),
            commits: cachedRes
        });
    }

    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);

    if(!response.ok) {
        return res.status(response.status).json({error: 'GitHub API error'});
    }

    const data = await response.json();

    cachedRes = data;
    cacheTimestamp = now;

    res.json({
        cacheAge: 0,
        commits: data
    });
})

module.exports = router;