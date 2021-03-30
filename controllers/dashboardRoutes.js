const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Drawing } = require('../models');
const withAuth = require('../utils/auth')

// A route to render the dashboard page, only for a logged in user
router.get('/', withAuth, (req, res) => {
    // All of the users posts are obtained from the database
    Drawing.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'pic',
            'description',
            'date_created',
        ],
        include: [
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
        .then(dbPostData => {
            // console.log(dbPostData)
            // serialize data before passing to template
            const drawings = dbPostData.map(post => post.get({ plain: true }));
            console.log(drawings)
            res.render('dashboard', { drawings, logged_in: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route to edit a post
router.get('/edit/:id', withAuth, (req, res) => {
    // All of the users posts are obtained from the database
    Drawing.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'description',
            'date_created',
        ],
        include: [
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
        .then(dbPostData => {
            // if no post by that id exists, return an error
            if (!dbPostData) {
                res.status(404).json({ message: 'No post drawing with this id' });
                return;
            }
            // serialize data before passing to template
            const drawing = dbPostData.get({ plain: true });
            res.render('edit-post', { drawing, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route to edit the logged in user
router.get('/edituser', withAuth, (req, res) => {
    // Acess the User model and run the findOne() method to get a single user based on parameters
    User.findOne({
        // when the data is sent back, exclude the password property
        attributes: { exclude: ['password'] },
        where: {
            // use id as the parameter for the request
            id: req.session.user_id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // if no user is found, return an error
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            // otherwise, return the data for the requested user
            const user = dbUserData.get({ plain: true });
            res.render('edit-user', { user, loggedIn: true });
        })
        .catch(err => {
            // if there is a server error, return that error
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;