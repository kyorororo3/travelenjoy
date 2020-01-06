const express = require('express');
const router = express.Router();


router.get('/routes/index', (req, res) =>
    res.json({
        list: [
            {id: 1, content: "content1!!!"},
            {id: 2, content: "content2!!!"}
        ]
    })
);

module.exports = router