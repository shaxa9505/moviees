const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const should = chai.should();


chai.use(chaiHttp);

describe("Bosh sahifani testdan utkazdik", () => {
    it("Get method orqali", (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
})