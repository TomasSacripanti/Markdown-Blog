const router = require('express').Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render("articles/articles", { articles: articles });
})

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/:slug', async (req, res) => {
    try {
        let article = await Article.findOne({slug: req.params.slug});
        res.render('articles/article', { article: article});
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.get('/edit/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        res.render('articles/edit', { article: article});
    } catch (error) {
        console.error(error);
        res.redirect('/articles/<%= article.slug %>');
    }
});

router.post('/', async (req, res) => {
    let { title, description, markdown } = req.body;
    let article = new Article({
        title: title,
        description: description,
        markdown: markdown,
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.error(error);
        res.render('/articles/new', { article: article });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        let { title, description, markdown, slug, sanitizedHtml } = req.body;
        let article = await Article.findById(req.params.id);
        article.title = title;
        article.description = description;
        article.markdown = markdown;
        article.slug = slug;
        article.sanitizedHtml = sanitizedHtml;
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;

