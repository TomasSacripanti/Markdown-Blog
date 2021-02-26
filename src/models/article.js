const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    sanitizedHtml: {
        type: String,
        required: true,
    },
});

articleSchema.pre('validate', function(next) {
    if (this.title) {
        //Si hay un título, asignamos su valor slugificado a la propiedad slug del objeto, pasandole un obj de config
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
        });
    };
    if (this.markdown) {
        //Convertimos nuestro Markdown a HTML, lo purificamos y lo asignamos a la propiedad sanitizedHtml
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
});

module.exports = mongoose.model('Article', articleSchema);