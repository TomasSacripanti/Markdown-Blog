const router = require('express').Router();
const Article = require('../models/article');

router.get('/', (req, res) => {
    res.render
});

router.get('/new', (req, res) => {
    res.render('articles/new');
});

router.post('/new', async (req, res) => {
    const { title, description } = req.body;
    const newArticle = new Article(title, description);
    await newArticle.save();
})

module.exports = router;

