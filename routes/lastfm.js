const express = require('express');
const router = express.Router();

const username = process.env.LASTFM_USERNAME;
const apiKey = process.env.LASTFM_API_KEY;

router.get('/recent-tracks', async (req, res) => {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`);
    if(!response.ok) {
        return res.status(response.status).json({error: 'Last.fm API error'});
    }

    const data = await response.json();

    res.json(data);
})

module.exports = router;