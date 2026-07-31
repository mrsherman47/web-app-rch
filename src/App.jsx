import React from 'react';
import Home from './pages/Home';
import About from './pages/About'; // Подключите остальные страницы по аналогии
import { translations } from './translations';

export default function App() {
    const [lang, setLang] = React.useState('ru');
    const [currentPage, setCurrentPage] = React.useState('home');

    // Админка
    const [isAdmin, setIsAdmin] = React.useState(localStorage.getItem('isAdmin') === 'true');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Список событий расписания
    const [events, setEvents] = React.useState([
        { id: 1, title: 'Домашняя группа', date: 'Ср. 02.09.2026', time: '19:00' },
        { id: 2, title: 'Молитвенное служение', date: 'Сб. 05.09.2026', time: '19:00' },
        { id: 3, title: 'Воскресное собрание', date: 'Вс. 06.09.2026', time: '11:00' }
    ]);

    // Редактирование строки в админке
    const [editingId, setEditingId] = React.useState(null);
    const [editTitle, setEditTitle] = React.useState('');
    const [editDate, setEditDate] = React.useState('');
    const [editTime, setEditTime] = React.useState('');

    // Новое событие
    const [newTitle, setNewTitle] = React.useState('');
    const [newDate, setNewDate] = React.useState('');
    const [newTime, setNewTime] = React.useState('');

    const t = translations[lang];

    // Функции перемещения блоков (вверх / вниз)
    const moveUp = (index) => {
        if (index === 0) return;
        const arr = [...events];
        const temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
        setEvents(arr);
    };

    const moveDown = (index) => {
        if (index === events.length - 1) return;
        const arr = [...events];
        const temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
        setEvents(arr);
    };

    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
            
            {/* ШАПКА (Общая для всех страниц) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div>
                    <span style={{ color: '#2481cc', fontWeight: '800' }}>REC</span> <b>CHURCH</b><br/>
                    <span style={{ fontSize: '11px', color: '#70778a' }}>{t.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {['ru', 'by', 'eng'].map((l) => (
                        <button 
                            key={l} 
                            onClick={() => setLang(l)}
                            style={{ background: lang === l ? '#2481cc' : 'none', color: lang === l ? '#fff' : '#333', border: '1px solid #ddd', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                        >
                            {l.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* МАРШРУТИЗАЦИЯ (Переключение страниц без перезагрузки) */}
            <main>
                {currentPage === 'home' && <Home lang={lang} events={events} onNavigate={setCurrentPage} />}
                {currentPage === 'about' && <About lang={lang} onNavigate={setCurrentPage} />}
                {/* Здесь можно добавить остальные страницы: events, community и т.д. */}
            </main>

            {/* ПАНЕЛЬ АДМИНИСТРАТОРА (Таблица внизу) */}
            {isAdmin && (
                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', marginTop: '20px', border: '2px dashed #2481cc' }}>
                    <h3>📊 Админ-панель: Расписание</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ background: '#f0f0f0' }}>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Событие</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Дата / Время</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((ev, index) => (
                                <tr key={ev.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '8px' }}>
                                        {editingId === ev.id ? (
                                            <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{ width: '100%' }} />
                                        ) : ev.title}
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                        {editingId === ev.id ? (
                                            <div>
                                                <input value={editDate} onChange={e => setEditDate(e.target.value)} style={{ width: '100%', marginBottom: '4px' }} />
                                                <input value={editTime} onChange={e => setEditTime(e.target.value)} style={{ width: '100%' }} />
                                            </div>
                                        ) : `${ev.date} | ${ev.time}`}
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                        <button onClick={() => moveUp(index)} disabled={index === 0}>⬆️</button>
                                        <button onClick={() => moveDown(index)} disabled={index === events.length - 1}>⬇️</button>
                                        {editingId === ev.id ? (
                                            <button style={{ background: 'green', color: '#fff' }} onClick={() => {
                                                setEvents(events.map(b => b.id === ev.id ? {...b, title: editTitle, date: editDate, time: editTime} : b));
                                                setEditingId(null);
                                            }}>💾</button>
                                        ) : (
                                            <button onClick={() => {
                                                setEditingId(ev.id);
                                                setEditTitle(ev.title);
                                                setEditDate(ev.date);
                                                setEditTime(ev.time);
                                            }}>✏️</button>
                                        )}
                                        <button style={{ background: '#d9534f', color: '#fff' }} onClick={() => setEvents(events.filter(b => b.id !== ev.id))}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h4 style={{ margin: '15px 0 5px' }}>Добавить событие:</h4>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setEvents([...events, { id: Date.now(), title: newTitle, date: newDate, time: newTime }]);
                        setNewTitle(''); setNewDate(''); setNewTime('');
                    }}>
                        <input placeholder="Название" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '6px' }} required />
                        <input placeholder="Дата (например, Ср. 02.09.2026)" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '6px' }} required />
                        <input placeholder="Время (например, 19:00)" value={newTime} onChange={e => setNewTime(e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '6px' }} required />
                        <button type="submit" style={{ background: '#2481cc', color: '#fff', border: 'none', width: '100%', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Добавить</button>
                    </form>
                </div>
            )}

            {/* ВХОД ДЛЯ АДМИНА (В самом низу сайта) */}
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                {isAdmin ? (
                    <button style={{ background: '#d9534f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => { setIsAdmin(false); localStorage.removeItem('isAdmin'); }}>Выйти из админки</button>
                ) : (
                    <details style={{ cursor: 'pointer', fontSize: '12px', color: '#70778a' }}>
                        <summary>Вход для администратора</summary>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (login === 'admin' && password === '1234') {
                                setIsAdmin(true);
                                localStorage.setItem('isAdmin', 'true');
                            } else { alert('Неверный логин или пароль'); }
                        }} style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <input placeholder="Логин (admin)" value={login} onChange={e => setLogin(e.target.value)} style={{ padding: '6px' }} />
                            <input type="password" placeholder="Пароль (1234)" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '6px' }} />
                            <button type="submit" style={{ background: '#2481cc', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>Войти</button>
                        </form>
                    </details>
                )}
            </div>

        </div>
    );
}
