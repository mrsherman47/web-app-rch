const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Секретный ключ для JWT и пароль берем из переменных окружения (файла .env)
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-12345';
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mypassword123'; // Хранится только на сервере!

// Временное хранилище (в реальном проекте подключается база данных, например SQLite или MongoDB)
let events = [
    { id: '1', title: 'Домашняя группа', date: '2026-09-02T19:00', type: 'week' },
    { id: '2', title: 'Воскресное собрание', date: '2026-09-06T11:00', type: 'week' },
];

// 1. Проверка логина и пароля
app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        // Генерируем токен на 24 часа
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Неверный логин или пароль' });
});

// Middleware для проверки JWT-токена
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// 2. Получение списка всех событий (публичный доступ)
app.get('/api/events', (req, res) => {
    res.json(events);
});

// 3. Добавление события (только для админа)
app.post('/api/events', authenticateToken, (req, res) => {
    const newEvent = { ...req.body, id: Date.now().toString() };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// 4. Удаление события (только для админа)
app.delete('/api/events/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    events = events.filter(e => e.id !== id);
    res.json({ message: 'Удалено' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});