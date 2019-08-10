const router = require('express').Router();
const Test = require('../db/models/test.js');

router.get('/', async (req, res, next) => {

    try {
        res.json(await Test.findAll());
    }
    catch (err){
        console.log(err)
    }
})

router.get('/:id', async (req, res, next) => {

    try {
        let id = req.params.id;
        res.json(await Test.findById(id))
    }
    catch (err){
        console.log(err)
    }

})

router.post('/student/:studentId', async (req, res, next) => {

    try {
        let student = req.params.studentId
        let test = await Test.create({
            subject: req.body.subject,
            grade: req.body.grade,
            studentId: student
          });
        res.status(201).json(test)
    }
    catch (err){
        console.log(err)
    }

})

router.delete('/:id', async (req, res, next) => {

    try {

        await Test.destroy({
            where: {id: `${req.params.id}`}
        })

        res.sendStatus(204);

    }
    catch (err) {
        console.log(err);
    }


})


module.exports = router;
