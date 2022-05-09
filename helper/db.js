const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb+srv://movies:dnU8HBFAi0kSEEec@newcluster.duasx.mongodb.net/test");
    const db = mongoose.connection;
    db.on("open", () => {
        console.log("Mongodbga onlayn ulandik Super!!!!");
    })
    db.on("error", (err) => {
        console.log("Mongodbda qandaydir xatolik bor", err);
    })
}