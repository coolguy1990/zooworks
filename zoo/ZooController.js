const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Zoo = require('./Zoo');

// Create a zoo
router.post('/', (req, res, next) => {
    Zoo.create({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        state_short_code: req.body.state_short_code,
        animal_count: req.body.animal_count
    }, (err, zoo) => {
        console.log(err);
        if (err) return res.status(500).send(response('problem adding to db'));

        return res.status(200).send(response('created zoo', 200, transform(zoo), true));
    });
});

// List all zoos
router.get('/', (req, res, next) => {
    Zoo.find({}, (err, zoo) => {
        if (err) return res.status(500).send(response('problem with db'));
        if(!zoo) return res.status(404).send(response('no zoos listed', 404));

        const data = zoo.map((z) => {
            return transform(z);
        });

        return res.status(200).send(response('all zoos', 200, data, true));
    })
});

// Get single zoo
router.get('/:id', (req, res, next) => {
    Zoo.findOne({id: req.params.id}, (err, zoo) => {
        if (err) return res.status(500).send(response('problem with db'));
        if (!zoo) return res.status(404).send(response('no zoo found', 404));

        return res.status(200).send(response('zoo', 200, transform(zoo), true));
    });
});

// Update single zoo
router.put('/:id', (req, res, next) => {
    Zoo.findOneAndUpdate({id: req.params.id}, req.body, {new: true, upsert: true}, (err, zoo) => {
        if (err) return res.status(500).send(response('There was a problem updating the zoo.'));

        return res.status(200).send(response('updated zoo', 200, transform(zoo), true));
    });
})

// Delete single zoo
router.delete('/:id', (req, res, next) => {
    Zoo.deleteOne({id: req.params.id}, (err, zoo) => {
        if (err) return res.status(500).send(response('problem with db', 500));
        if (!zoo || (zoo && zoo.n === 0)) return res.status(404).send(response('not able to delete', 404));
        if (zoo && zoo.ok === 1 && zoo.n === 1) return res.status(200).send(response('deleted successfully', 200));
    });
});

function transform (zoo) {
    return {
        id: zoo.id,
        name: zoo.name,
        city: zoo.city,
        state: zoo.state,
        animal_count: zoo.animal_count,
        state_short_code: zoo.state_short_code
    };
};

function response (message = '', http_code = 500, data = {}, success = false) {
    return {
        status: {
            success: success,
            http_code: http_code,
            message: message
        },
        data: data
    };
};

module.exports = router;