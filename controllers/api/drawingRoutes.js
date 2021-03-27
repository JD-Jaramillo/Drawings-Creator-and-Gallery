const router = require('express').Router();
const { Drawing } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newDrawing = await Drawing.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.render('drawing');
        res.status(200).json(newDrawing);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const drawingData = await Drawing.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!drawingData) {
            res.status(404).json({ message: 'No drawing found with this id!' });
            return;
        }

        res.status(200).json(drawingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;