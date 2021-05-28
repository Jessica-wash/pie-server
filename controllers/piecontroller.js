// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const { PieModel } = require('../models');

//router.get('/', (req, res) => res.send('I love pies!'));
router.get("/", async (req, res) => {
    try {
        const allPies = await PieModel.findAll();

        res.status(200).json(allPies);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

router.get("/name/:name", async (req, res) => {
    try {
        const locatedPie = await PieModel.findOne({
            where: { nameOfPie: req.params.name }
        })

        res.status(200).json({
            message: "Pie successfully retrieved",
            pie: locatedPie
        })
    } catch (err) {
        res.status(500).json({

        })
    }

})

router.post("/", async (req, res) => {
    const { nameOfPie, baseOfPie, crustOfPie, timeToBake, servings, ratings } = req.body;

    try {
        const Pie = await PieModel.create({
            nameOfPie,
            baseOfPie,
            crustOfPie,
            timeToBake,
            servings,
            ratings,
        });

        res.status(201).json({
            message: "Pie successfully created",
            Pie
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create pie: ${err}`
        })
    }
});

router.put("/:name", async (req, res) => {
    const { nameOfPie, baseOfPie, crustOfPie, timeToBake, servings, ratings } = req.body;

    try {
        const pieUpdated = await PieModel.update({ nameOfPie, baseOfPie, crustOfPie, timeToBake, servings, ratings },
            { where: { id: req.params.id } }
        )

        res.status(200).json({
            message: "Pies successfully updated",
            pieUpdated
        })

    } catch (err) {
        res.status(500).json({
            message: `Failed to update pie: ${err}`
        })
    }
})


router.delete("/delete/:id", async (req, res) => {
    try {
        const locatedPie = await PieModel.destroy({
            where: {id: req.params.id}
        })
        .then((result) => {
            res.status(200).json({
                message: "Pie was successfully deleted",
                deletedPie: locatedPie
            })
        })

    } catch(err) {
        res.status(500).json({
            message: `Failed to delete pie: ${err}`
        })
    }
})

module.exports = router;