const router = require('express').Router();
const Students = require('../db/models/student.js')

router.get('/', async (req, res, next) => {

    try {
       res.json(await Students.findAll());
    }
    catch (err){
        console.log(err)
    }

})

router.get('/:id', async (req, res, next) => {

    try {
        let id = req.params.id;
        if (!(await Students.findById(id))){
           res.sendStatus(404)
        }
        else {
            res.json(await Students.findById(id))
        }
     
    }
    catch (err) {
        console.log(err);
    }

})

router.post('/', async (req, res, next) => {

    try {
      res.status(201).json( await Students.create(req.body));
    }
    catch (err){
        console.log(err)
    }

})

router.put('/:id', async (req, res, next) => {

    try {
        let id = req.params.id;
        let updateValues = req.body;
        let [, updatedStudents] = await Students.update(updateValues, {
            where: {id: `${id}`},
            returning: true,
            plain: true
            });

        res.json(updatedStudents)
    }
    catch (err){
        console.log(err);
    }

})

router.delete('/:id', async (req, res, next) => {

    try {

        await Students.destroy({
            where: {id: `${req.params.id}`}
        });

        res.sendStatus(204);

    }
    catch (err){
        console.log(err)
    }


})

module.exports = router;
