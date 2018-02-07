const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Animal = require('./Animal');

// Create a animal
router.post('/', (req, res, next) => {
    Animal.create({
        name: req.body.name,
        zoological_name: req.body.zoological_name,
        family_name: req.body.family_name,
        status: req.body.status,
        zoos: req.body.zoos
    }, (err, animal) => {
        if (err) return res.status(500).send(response('problem adding to db'));

        return res.status(200).send(response('created animal', 200, transform(animal), true));
    });
});

// List all animals
router.get('/', (req, res, next) => {
    Animal.find({}, (err, animal) => {
        if (err) return res.status(500).send(response('problem with db'));
        if(!animal) return res.status(404).send(response('no animals listed', 404));

        const data = animal.map((z) => {
            return transform(z);
        });

        return res.status(200).send(response('all animals', 200, data, true));
    })
});

// Get single animal
router.get('/:id', (req, res, next) => {
    Animal.findOne({id: req.params.id}, (err, animal) => {
        if (err) return res.status(500).send(response('problem with db'));
        if (!animal) return res.status(404).send(response('no animal found', 404));

        return res.status(200).send(response('animal', 200, transform(animal), true));
    });
});

// Update single animal
router.put('/:id', (req, res, next) => {
    Animal.findOneAndUpdate({id: req.params.id}, req.body, {new: true, upsert: true}, (err, animal) => {
        if (err) return res.status(500).send(response('There was a problem updating the animal.'));

        return res.status(200).send(response('updated animal', 200, transform(animal), true));
    });
})

// Delete single animal
router.delete('/:id', (req, res, next) => {
    Animal.deleteOne({id: req.params.id}, (err, animal) => {
        if (err) return res.status(500).send(response('problem with db', 500));
        if (!animal || (animal && animal.n === 0)) return res.status(404).send(response('not able to delete', 404));
        if (animal && animal.ok === 1 && animal.n === 1) return res.status(200).send(response('deleted successfully', 200));
    });
});

function transform (animal) {
    return {
        id: animal.id,
        uuid: animal.uuid,
        name: animal.name,
        zoological_name: animal.zoological_name,
        family_name: animal.family_name,
        status: animal.status,
        zoos: animal.zoos
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