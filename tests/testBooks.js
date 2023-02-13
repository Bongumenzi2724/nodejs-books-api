let chai=require('chai')
let chaiHttp=require('chai-http');
const { describe } = require('mocha');
let mocha = require('mocha')
let server=require('../app');

//Assertion Style

chai.should();
chai.use(chaiHttp)
//Get All Books From the server
describe('Get Books /api/books',()=>{
    it("It should get all the books",(done)=>{
        chai.request(server).get("/api/books").end((err,response)=>{
            response.should.have.status(200);
            response.body.be.a('array');
            response.body.length.should.be.eq(10);
        done();
        })
    })

    it("It should get any of the books",(done)=>{
        chai.request(server).get("/api/book").end((err,response)=>{
            response.should.have.status(404);
            response.body.be.a('array');
            response.body.length.should.be.eq(10);
        done();
        })
    })
})
//Get book by id from the server
describe('Get Books /api/books/:id',()=>{
    it("It should get a book by id",(done)=>{
        chai.request(server).get("/api/books/:id").end((err,response)=>{
            response.should.have.status(200);
            response.body.be.a('array');
            response.body.length.should.be.eq(10);
        done();
        })
    })

    it("It should get any of the books",(done)=>{
        chai.request(server).get("/api/book").end((err,response)=>{
            response.should.have.status(404);
            response.body.be.a('array');
            response.body.length.should.be.eq(10);
        done();
        })
    })
})
