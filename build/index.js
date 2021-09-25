"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const ok = 200;
const created = 201;
const db = {
    users: [
        {
            id: 1,
            firstName: 'Juku',
            lastName: 'Juurikas',
        },
        {
            id: 2,
            firstName: 'Mari',
            lastName: 'Maasikas',
        }
    ]
};
app.get('/ping', (req, res) => {
    res.status(ok).json({
        message: 'Hello world!',
    });
});
app.get('/users', (req, res) => {
    res.status(ok).json({
        users: db.users,
    });
});
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = db.users.find((element) => element.id === id);
    res.status(ok).json({
        user
    });
});
app.post('/users', (req, res) => {
    const { firstName, lastName } = req.body;
    const id = db.users.length + 1;
    db.users.push({
        id,
        firstName,
        lastName,
    });
    res.status(created).json({
        id
    });
});
app.listen(port, () => {
    console.log('Server is running');
});
