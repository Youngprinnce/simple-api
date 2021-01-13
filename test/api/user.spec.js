//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const { close } = require("../../config/db");
const server = require('../../server');
const User = require("../../models/User")

describe('Users Endpoint', () => {
    after((done) => {
        close()
        done()
    });
    
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });

    /*
    * Test the /GET route
    */
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST user', () => {
        it('it should not POST a user without email field', (done) => {
            let user = {
                firstname: "Ajiboye",
                lastname: "Adedotun",
                mobile: 123456789
            }
            chai.request(server)
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        });
        it('it should POST a user ', (done) => {
            let user = {
                firstname: "Ajiboye",
                lastname: "Adedotun",
                mobile: 123456789,
                email:"ajiboyeadedotun16@gmail.com"
            }
            chai.request(server)
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.a('object');
                    res.body.should.have.property('message').eql('User created successfully');
                    res.body.data.should.have.property('firstname');
                    res.body.data.should.have.property('lastname');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('mobile');
                    done();
                });
        });
    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            let user = new User({ firstname: "Ajiboye", lastname: "Adedotun", mobile: 123456789, email: "ajiboyeadedotun16@gmail.com" });
            user.save((err, user) => {
                chai.request(server)
                    .get('/api/users/' + user._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('firstname');
                        res.body.data.should.have.property('lastname');
                        res.body.data.should.have.property('email');
                        res.body.data.should.have.property('mobile');
                        // res.body.data.should.have.property('_id').eql(mongoose.Types.ObjectId(user._id));
                        done();
                    });
            });
        });
    });


    /*
    * Test the /PATCH/:id route
    */
    describe('/PATCH/:id user', () => {
        it('it should UPDATE a user given the id', (done) => {
            let user = new User({ firstname: "Ajiboye", lastname: "Adedotun", mobile: 123456789, email: "ajiboyeadedotun16@gmail.com" });
            user.save((err, user) => {
                chai.request(server)
                    .patch('/api/users/' + user._id)
                    .send({ firstname: "Lewis", lastname: "Goerge", mobile: 321654987 })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.data.should.be.a('object');
                        res.body.should.have.property('message').eql('User updated');
                        res.body.data.should.have.property('lastname').eql("Goerge");
                        done();
                    });
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', (done) => {
            let user = new User({ firstname: "Ajiboye", lastname: "Adedotun", mobile: 123456789, email: "ajiboyeadedotun16@gmail.com" });
            user.save((err, user) => {
                chai.request(server)
                    .delete('/api/users/' + user._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User successfully deleted');
                        done();
                    });
            });
        });
    });
})