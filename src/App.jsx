

function App() {
            // Состояние языка (ru, by, eng)
            const [lang, setLang] = React.useState('ru');

            // Авторизация админа
            const [isAdmin, setIsAdmin] = React.useState(localStorage.getItem('isAdmin') === 'true');
            const [login, setLogin] = React.useState('');
            const [password, setPassword] = React.useState('');

            // Данные расписания (блоки, которые можно двигать и редактировать)
            const [events, setEvents] = React.useState([
                { id: 1, title: 'Домашняя группа', date: 'Ср. 02.09.2026', time: '19:00' },
                { id: 2, title: 'Молитвенное служение', date: 'Сб. 05.09.2026', time: '19:00' },
                { id: 3, title: 'Воскресное собрание', date: 'Вс. 06.09.2026', time: '11:00' }
            ]);

            // Редактирование строки в таблице
            const [editingId, setEditingId] = React.useState(null);
            const [editTitle, setEditTitle] = React.useState('');
            const [editDate, setEditDate] = React.useState('');
            const [editTime, setEditTime] = React.useState('');

            // Новый элемент
            const [newTitle, setNewTitle] = React.useState('');
            const [newDate, setNewDate] = React.useState('');
            const [newTime, setNewTime] = React.useState('');

            // Состояние для гармошки «Первый визит»
            const [openAccordion, setOpenAccordion] = React.useState(null);

            // Тексты интерфейса для 3 языков
            const t = {
                ru: {
                    title: "ПРИМИРЕНИЕ ЦЕРКОВЬ",
                    subtitle: "Собрания в церкви «Примирение»",
                    desc: "Примирение - интернациональная церковь в Минске. Здесь вы можете узнать о воскресных собраниях, ближайших событиях и проповедях[cite: 2].",
                    watchBtn: "Смотреть проповеди",
                    scheduleTitle: "Расписание месяца",
                    allScheduleBtn: "Все расписание",
                    firstVisitTitle: "ПЕРВЫЙ ВИЗИТ",
                    firstVisitSub: "Первый раз в нашей церкви? Мы собрали основную информацию для тех, кто приходит впервые.",
                    aboutTitle: "О нашей церкви",
                    aboutDesc: "Церковь «Примирение» — интернациональная церковь в Минске...",
                    detailsBtn: "Подробнее",
                    navTitle: "Навигация",
                    nav: ["О церкви", "События", "Общение", "Наши служения", "Команда", "Крещение", "Контакты"]
                },
                by: {
                    title: "ПАМІРЭННЕ ЦЭРКВА",
                    subtitle: "Сходы ў цэркве «Памірэнне»",
                    desc: "Памірэнне — інтэрнацыянальная царква ў Мінску...",
                    watchBtn: "Глядзець пропаведзі",
                    scheduleTitle: "Расклад месяца",
                    allScheduleBtn: "Усё расклад",
                    firstVisitTitle: "ПЕРШЫ ВІЗІТ",
                    firstVisitSub: "Першы раз у нашай цэркве? Сабралі асноўную інфармацыю.",
                    aboutTitle: "Пра нашу царкву",
                    aboutDesc: "Царква «Памірэнне» — інтэрнацыянальная царква...",
                    detailsBtn: "Падрабязней",
                    navTitle: "Навігацыя",
                    nav: ["Пра царкву", "Падзеі", "Адносіны", "Нашы служэння", "Каманда", "Крышчэнне", "Кантакты"]
                },
                eng: {
                    title: "RECONCILIATION CHURCH",
                    subtitle: "Gatherings at Reconciliation Church",
                    desc: "Reconciliation is an international church in Minsk...",
                    watchBtn: "Watch Sermons",
                    scheduleTitle: "Monthly Schedule",
                    allScheduleBtn: "All Schedule",
                    firstVisitTitle: "FIRST VISIT",
                    firstVisitSub: "First time at our church? We gathered basic info.",
                    aboutTitle: "About our church",
                    aboutDesc: "Reconciliation Church is an international church in Minsk...",
                    detailsBtn: "Details",
                    navTitle: "Navigation",
                    nav: ["About church", "Events", "Community", "Ministries", "Team", "Baptism", "Contacts"]
                }
            };

            const currentText = t[lang];

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

            // Добавление / Сохранение
            const handleAdd = (e) => {
                e.preventDefault();
                setEvents([...events, { id: Date.now(), title: newTitle, date: newDate, time: newTime }]);
                setNewTitle(''); setNewDate(''); setNewTime('');
            };

            return (
                <div className="app-container">
                    
                    {/* ШАПКА */}
                    <div className="header">
                        <div className="logo-block">
                            <span style={{color: '#2481cc'}}>REC</span> CHURCH<br/>
                            <span style={{fontSize: '11px', color: '#70778a'}}>{currentText.title}</span>
                        </div>
                        <div className="lang-switcher">
                            <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => setLang('ru')}>RU</button>
                            <button className={`lang-btn ${lang === 'by' ? 'active' : ''}`} onClick={() => setLang('by')}>BY</button>
                            <button className={`lang-btn ${lang === 'eng' ? 'active' : ''}`} onClick={() => setLang('eng')}>ENG</button>
                        </div>
                    </div>

                    {/* ГЛАВНЫЙ БАННЕР */}
                    <div className="hero-banner">
                        <span style={{fontSize: '11px', opacity: 0.8}}>rec.church.minsk</span>
                        <h2 style={{margin: '8px 0'}}>{currentText.subtitle}</h2>
                        <p style={{fontSize: '13px', lineHeight: '1.4', opacity: 0.9}}>{currentText.desc}</p>
                        <button className="primary-btn" style={{background: '#fff', color: '#000'}}>{currentText.watchBtn}</button>
                    </div>

                    {/* РАСПИСАНИЕ МЕСЯЦА */}
                    <div className="card">
                        <h3>{currentText.scheduleTitle}</h3>
                        {events.map((item) => (
                            <div className="schedule-item" key={item.id}>
                                <div className="event-title">{item.title}</div>
                                <div className="event-date">{item.date} | {item.time}</div>
                            </div>
                        ))}
                        <button className="primary-btn">{currentText.allScheduleBtn}</button>
                    </div>

                    {/* ПЕРВЫЙ ВИЗИТ (Гармошка) */}
                    <div className="card">
                        <span style={{fontSize: '11px', fontWeight: 'bold', color: '#2481cc'}}>{currentText.firstVisitTitle}</span>
                        <h3 style={{margin: '6px 0 10px'}}>{currentText.firstVisitSub}</h3>
                        
                        {['Служение', 'Добраться', 'Друзья'].map((item, idx) => (
                            <div className="accordion-item" key={idx}>
                                <div className="accordion-header" onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}>
                                    <span>{item}</span>
                                    <span>{openAccordion === idx ? '−' : '+'}</span>
                                </div>
                                {openAccordion === idx && (
                                    <div className="accordion-body">
                                        Здесь будет подробная информация для раздела "{item}", которую вы сможете отредактировать.
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* О НАШЕЙ ЦЕРКВИ */}
                    <div className="card">
                        <h3>{currentText.aboutTitle}</h3>
                        <p style={{fontSize: '13px', color: 'var(--hint-color)'}}>{currentText.aboutDesc}</p>
                        <button className="primary-btn">{currentText.detailsBtn}</button>
                    </div>

                    {/* ФУТЕР И НАВИГАЦИЯ */}
                    <div className="card">
                        <div style={{fontWeight: '800', fontSize: '15px'}}>REC CHURCH</div>
                        <p style={{fontSize: '12px', color: 'var(--hint-color)'}}>Интернациональная церковь.</p>
                        <h4 style={{margin: '12px 0 6px', fontSize: '14px'}}>{currentText.navTitle}</h4>
                        <ul className="nav-list">
                            {currentText.nav.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                        <p style={{fontSize: '12px', fontWeight: 'bold', marginTop: '14px'}}>example@gmail.com</p>
                    </div>

                    {/* ПАНЕЛЬ АДМИНИСТРАТОРА (Таблица + Стрелочки) */}
                    {isAdmin && (
                        <div className="card admin-panel">
                            <h3>📊 Админ-панель: Управление расписанием</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Событие</th>
                                        <th>Дата/Время</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((ev, index) => (
                                        <tr key={ev.id}>
                                            <td>
                                                {editingId === ev.id ? (
                                                    <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                                                ) : ev.title}
                                            </td>
                                            <td>
                                                {editingId === ev.id ? (
                                                    <div>
                                                        <input value={editDate} onChange={e => setEditDate(e.target.value)} />
                                                        <input value={editTime} onChange={e => setEditTime(e.target.value)} />
                                                    </div>
                                                ) : `${ev.date} | ${ev.time}`}
                                            </td>
                                            <td className="admin-actions">
                                                <button onClick={() => moveUp(index)} disabled={index === 0}>⬆️</button>
                                                <button onClick={() => moveDown(index)} disabled={index === events.length - 1}>⬇️</button>
                                                {editingId === ev.id ? (
                                                    <button style={{background: 'green', color: '#fff'}} onClick={() => {
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
                                                <button style={{background: '#d9534f', color: '#fff'}} onClick={() => setEvents(events.filter(b => b.id !== ev.id))}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h4 style={{marginTop: '15px'}}>Добавить событие:</h4>
                            <form onSubmit={handleAdd}>
                                <input placeholder="Название" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                                <input placeholder="Дата (например, Ср. 02.09.2026)" value={newDate} onChange={e => setNewDate(e.target.value)} required />
                                <input placeholder="Время (например, 19:00)" value={newTime} onChange={e => setNewTime(e.target.value)} required />
                                <button className="primary-btn" type="submit">Добавить в расписание</button>
                            </form>
                        </div>
                    )}

                    {/* ВХОД ДЛЯ АДМИНА В САМОМ НИЗУ */}
                    <div style={{textAlign: 'center', padding: '10px 0'}}>
                        {isAdmin ? (
                            <button style={{background: '#d9534f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px'}} onClick={() => { setIsAdmin(false); localStorage.removeItem('isAdmin'); }}>Выйти из админки</button>
                        ) : (
                            <details style={{cursor: 'pointer', fontSize: '12px', color: '#70778a'}}>
                                <summary>Вход для администратора</summary>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (login === 'admin' && password === '1234') {
                                        setIsAdmin(true);
                                        localStorage.setItem('isAdmin', 'true');
                                    } else { alert('Неверный логин или пароль'); }
                                }} style={{marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                    <input placeholder="Логин (admin)" value={login} onChange={e => setLogin(e.target.value)} />
                                    <input type="password" placeholder="Пароль (1234)" value={password} onChange={e => setPassword(e.target.value)} />
                                    <button type="submit" style={{background: '#2481cc', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px'}}>Войти</button>
                                </form>
                            </details>
                        )}
                    </div>

                </div>
            );
        }

        ReactDOM.createRoot(document.getElementById('root')).render(<App />);