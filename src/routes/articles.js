const router = require('express').Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let article = await Article.findById(id);
        res.render('articles/article', { article: article});
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
})

router.post('/', async (req, res) => {
    let { title, description, markdown } = req.body;
    let article = new Article({
        title: title,
        description: description,
        markdown: markdown,
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (error) {
        console.error(error);
        res.render('/articles/new', { article: article });
    }
});

module.exports = router;

