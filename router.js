const db = require('./models');
const express = require('express');
const router = express.Router();

// Sequelize
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Fallback
router.route('/').get((req, res) => res.sendStatus(200))

// Articles
router.route('/articles').get(async (request, response) => {
    const articles = await db.Article.findAll({
        where: {
            title: request.query.title ? {
                [Op.like]: `%${request.query.title}%`
            } : {
                [Op.not]: null
            }
        },
        order: [
            ['publication_date', 'DESC']
        ]
    })

    return response.json({
        payload: articles
    });
})

router.route('/articles/:id').get(async (request, response) => {
    const article = await db.Article.findOne({
        where: {
            id: parseInt(request.params.id)
        }
    })

    if (!article) {
        return response.status(400).json({
            message: 'Unable to find article.'
        })
    }

    return response.json({
        payload: article
    })
})

router.route('/articles/:id').post(async (request, response) => {
    let article = await db.Article.findOne({
        where: {
            id: parseInt(request.params.id)
        }
    })

    if (!article || !request.body.payload) {
        return response.status(400).json({
            message: 'Unable to update article.'
        })
    }

    Object.assign(article, request.body.payload)
    try {
        article = await article.save()
    } catch(err) {
        return response.status(400).json({
            message: `Unable to save article: ${err}`
        })
    }

    return response.json({
        payload: article
    })
})

router.route('/articles/:id').delete(async (request, response) => {
    let article = await db.Article.findOne({
        where: {
            id: parseInt(request.params.id)
        }
    })

    if (!article) {
        return response.status(400).json({
            message: 'Unable to delete article.'
        })
    }

    try {
        article = await article.destroy()
    } catch(err) {
        return response.status(400).json({
            message: `Unable to destroy article: ${err}`
        })
    } finally {
        return response.json({
            payload: article
        })
    }
})

router.route('/articles').post(async (request, response) => {
    if (!request.body.payload) {
        return response.status(400).json({
            message: 'Unable to add article.'
        })
    }

    let article

    try {
        article = await db.Article.create(request.body.payload)
    } catch (err) {
        return response.status(400).json({
            message: `Unable to create article: ${err}`
        })
    } finally {
        return response.json({
            payload: article
        })
    }
})

module.exports = router;