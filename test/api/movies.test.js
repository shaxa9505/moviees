const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const should = chai.should();


chai.use(chaiHttp);

// POST orqali registratsiyadan utish
// describe("Post orqali register va authenticate", () => {
//     it("Post orqali registratsiya", (done) => {

//         const user = {
//             username: "Akmal",
//             password: "11111"
//         }
//         chai.request(server)
//         .post("/register")
//         .send(user)
//         .end((err, res) => {
//             res.should.have.status(200)
//             res.should.have.be.a("object")
//             done()
//         })
//     }).timeout(10000)
// })



describe("Post orqali authenticate", () => {


    before((done) => {
            chai.request(server)
            .post("/authenticate")
            .send({ username: "Akmal", password: "11111" })
            .end((err, res) => {
                token = res.body.token;
                console.log(token);
                done()
            })
    })

    describe("Get orqali movieslarni tekshirdik", () => {
        it("/Get movies", (done) => {
            chai.request(server)
                .get("/api/movies")
                .set("x-acces-token", token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("array")
                    done()
                })
        })
    })

})


