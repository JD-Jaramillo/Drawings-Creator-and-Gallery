const router = require('express').Router();
const { Drawing } = require('../../models');
const cloudinary = require('cloudinary').v2;

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

// Saves image to Cloudinary
router.post('/save', async (req, res) => {
    try {
        // const imageURL = document.querySelector('canvas').toDataURL( 'image/jpeg', 1.0);
        // const userName = req.session.user_name;
        // const fileName = document.querySelector('input[name="drawing-title"]').value.trim();
        console.log("test");
    
        cloudinary.uploader.upload(req.body.imageURL, {
        //   public_id: `${userName}/${fileName}`,
          overwrite: true
        }, (err, result) => {
            console.log(result);
            res.json(result);
        });
    }
    catch (error) {
        console.log(error);
    }
})

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