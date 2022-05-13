const {Router} = require("express");
const router = Router();

const mongoose = require("mongoose");

const DirectorSchema = require("../model/Directors");

// router.get("/",  (req, res) => {
//     res.send("GET METHOD")
// })


// POST databsega ma`lumot kiritish
router.post("/", (req ,res) => {
    const director = new DirectorSchema(req.body);

    const promise = director.save();

    promise.then(data => res.json(data))
            .catch(err => res.json(err))
})


// GET id buyicha chiqarish
// router.get("/:director_id", (req ,res) => {
//     const promise = DirectorSchema.findById(req.params.director_id);

//     promise.then(data => res.json(data))
//             .catch(err => res.json(err))
// })


// GET hammasini va id buyicha chiqarish 
router.get("/:director_id", (req ,res) => {
    const promise = DirectorSchema.aggregate([
        {
            $match: {
                "_id" : mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "director_id",
                as: "kinolar"
            }
        },
        {
            $unwind: {
                path: "$kinolar" // berda faqat idisi borlarini kursatadi yani id bilan director_idiss bir xillarini
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                movies: {
                    $push: "$kinolar"
                }
            }
        },
        // {  // qisqartirish uslubi
        //     $project: {
        //         _id: "$_id._id",
        //         name: "$_id.name",
        //         surname: "$_id.surname",
        //         bio: "$_id.bio",
        //         // movies: "$movies" // berda agar wuni yozsek yoqtirgan kinolariniyam chiqarib beradi
        //     }
        // }
    ]);

    promise.then(data => res.json(data))
            .catch(err => res.json(err))
})


// PUT id buyicha uzgartirish
router.put("/:director_id", (req ,res) => {
    const promise = DirectorSchema.findByIdAndUpdate(req.params.director_id, req.body);

    promise.then(data => res.json(data))
            .catch(err => res.json(err))
})


// DELETE id buyicha uchirish
router.delete("/:director_id", (req ,res) => {
    const promise = DirectorSchema.findByIdAndRemove(req.params.director_id);

    promise.then(data => res.json(data))
            .catch(err => res.json(err))
})


// GET id buyicha top 10 ta eng yaxwi kinolarni chiqarish
router.get("/:director_id/best10movie", (req ,res) => {
    
    
    const promise = DirectorSchema.aggregate([
        {
            $match: {
                "_id" : mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "director_id",
                as: "kinolar"
            }
        },
        {
            $unwind: {
                path: "$kinolar" // berda faqat idisi borlarini kursatadi yani id bilan director_idiss bir xillarini
            }
        },
        {
            $limit: 4
        },
        {
            $sort: {
                "kinolar.imdb_score": -1
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    // name: "$name",
                    // surname: "$surname",
                    // bio: "$bio"
                },
                movies: {
                    $push: "$kinolar"
                }
            }
        },
        {  // berda faqatgina uwa yoqtirgan kinolarini kursatdik
            $project: {
                _id: false,
                // _id: "$_id._id",
                // name: "$_id.name",
                // surname: "$_id.surname",
                // bio: "$_id.bio",
                movies: "$movies" // berda agar wuni yozsek yoqtirgan kinolariniyam chiqarib beradi
            }
        }
    ]);

    promise.then(data => res.json(data))
            .catch(err => res.json(err))
})






module.exports = router