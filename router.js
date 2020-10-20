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

    return response.json({
        payload: article
    })
})

router.route('/articles/:id').get(async (request, response) => {
    const article = await db.Article.findOne({
        where: {
            id: parseInt(request.params.id)
        }
    })

    return response.json({
        payload: article
    })
})

module.exports = router;