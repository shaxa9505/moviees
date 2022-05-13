const express = require('express');
const router = express.Router();

const Moviee = require("../model/Movies")

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

// POST create new api
router.post('/', (req, res, next) => {

    // const {title, category, country, year, imdb_score} = req.body;

    // const moviee = new Moviee({
    //     title: title,
    //     category: category,
    //     country: country,
    //     year: year,
    //     imdb_score: imdb_score
    // })
    const moviee = new Moviee(req.body)

    const promise = moviee.save();

    promise.then(data => res.json(data))
    .catch(err => console.log(err))

});


// GET api/movies/:movie_id yani id buyicha chiqarish
router.get("/:movie_id", (req, res, next) => {
    const promise = Moviee.findById(req.params.movie_id)

    promise.then(data => res.json(data))
    .catch(err => console.log("Qayerdadir xatolik bor", err))
})



// PUT yani uzgartirish yoki update
router.put("/:movie_id", (req, res) => {
    const promise = Moviee.findByIdAndUpdate(req.params.movie_id, req.body)

    promise.then(data => res.json(data))
    .catch(err => console.log(err))
})



// PUT yani uzgartirish yoki update
router.put("/:movie_id", (req, res) => {
    const promise = Moviee.findByIdAndUpdate(req.params.movie_id, req.body)

    promise.then(data => res.json(data))
    .catch(err => console.log(err))
})



// DELETE yani uchirish id orqali
router.delete("/:movie_id", (req, res) => {
    const promise = Moviee.findByIdAndRemove(req.params.movie_id)

    promise.then(data => res.json(data))
    .catch(err => console.log(err))
})



// GET top 10 talik kinolarni chiqarish imdb_score buyicha
router.get("/api/top10", (req, res) => {
    const promise = Moviee.find({}).limit(10).sort({imdb_score: -1})

    promise.then(data => res.json(data))
    .catch(err => console.log(err))
})



// GET masalan 1980 yildan 2010 yilgacha bulgan kinolarni chiqarish || shu 2 ta yilni urtasidegilani
router.get("/between/:start_year/:end_year", (req, res) => {

    const {start_year, end_year} = req.params;

    const promise = Moviee.find({year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)}})

    promise.then(data => res.json(data))
    .catch(err => console.log(err))
})


module.exports = router;
