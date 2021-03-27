const router = require('express').Router();
const { User, Drawing } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/drawing/:id', withAuth, async (req, res) => {
    try {
        const drawingData = await Drawing.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const drawing = drawingData.get({ plain: true });

        res.render('drawing', {
            ...drawing,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/drawing', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const user = userData.get({ plain: true });

        res.render('drawing', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;