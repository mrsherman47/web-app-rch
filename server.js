const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-12345';
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mypassword123';

const DATA_FILE = path.join(__dirname, 'events_db.json');

// Стандартные данные
const defaultData = {
    week: [
    ],
    month: [
    ]
};

// Функция чтения из JSON-файла
function readData() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            writeData(defaultData);
            return defaultData;
        }
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        console.error('Ошибка чтения базы данных:', e);
        return defaultData;
    }
}

// Функция записи в JSON-файл
function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error('Ошибка записи базы данных:', e);
    }
}

// 1. Авторизация
app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Неверный логин или пароль' });
});

// Middleware проверки JWT
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
    const data = readData();
    res.json(data);
});

// 3. Добавление события (только для админа)
app.post('/api/events', authenticateToken, (req, res) => {
    const { title, date, time, section, location, link } = req.body;

    if (!title || !date || !time || !section) {
        return res.status(400).json({ message: 'Заполните обязательные поля (title, date, time, section)' });
    }

    const data = readData();
    const targetSection = section === 'month' ? 'month' : 'week';

    const newEvent = {
        id: Date.now().toString(),
        title: title.trim(),
        date: date.trim(),
        time: time.trim(),
        location: location ? location.trim() : '',
        link: link ? link.trim() : '#'
    };

    data[targetSection].push(newEvent);
    writeData(data);

    res.status(201).json(newEvent);
});

// 4. Удаление события (только для админа)
app.delete('/api/events/:section/:id', authenticateToken, (req, res) => {
    const { section, id } = req.params;
    const data = readData();

    if (section !== 'week' && section !== 'month') {
        return res.status(400).json({ message: 'Неверный раздел' });
    }

    data[section] = data[section].filter(e => e.id !== id);
    writeData(data);

    res.json({ message: 'Удалено' });
});

// 5. Сброс к дефолтным данным (для тестов)
app.post('/api/events/reset', authenticateToken, (req, res) => {
    writeData(defaultData);
    res.json(defaultData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});