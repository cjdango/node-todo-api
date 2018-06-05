const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'cjdango@example.com',
        password: 'UserOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'jen@example.com',
        password: 'UserTwoPass'
    }
];

const todos = [
    {
        _id: new ObjectID(),
        text: 'first test todo'
    },
    {
        _id: new ObjectID(),
        text: 'second test todo',
        completed: true,
        completedAt: 333
    }
];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };