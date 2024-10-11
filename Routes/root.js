const express = require('express');
const router = express.Router();
const path = require('path'); 

router.get('^/$|/index(.html)?', (req, res)=> {     //means three types of requests: /, index, index.html
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/new-page(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});
router.get('/old-page.html', (req, res)=> {
    res.redirect(301, '/new-page.html'); //not specifying 301 redirects to 302
})

module.exports = router;