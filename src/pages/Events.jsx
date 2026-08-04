// Укажите IP вашего сервера VDSina
const API_URL = 'http://89.124.103.216:5000';

// ---------------------------------------------------------------------
// 1. ГОТОВЫЕ ШАБЛОНЫ МЕРОПРИЯТИЙ
// Вы можете добавлять сюда любые новые типовые события и менять ссылки!
// ---------------------------------------------------------------------
const EVENT_TEMPLATES = [
    {
        id: 'home_group',
        title: 'Домашняя группа',
        link: 'https://t.me/church_chat', // Ваша ссылка
        defaultLocation: 'В гостях / Уточняйте в чате'
    },
    {
        id: 'sunday_service',
        title: 'ВОСКРЕСНОЕ СОБРАНИЕ',
        link: 'https://t.me/church_channel',
        defaultLocation: 'Главный зал'
    },
    {
        id: 'prayer',
        title: 'МОЛИТВЕННОЕ СЛУЖЕНИЕ',
        link: 'https://t.me/church_chat',
        defaultLocation: 'Малый зал'
    },
    {
        id: 'boys_brunch',
        title: 'Boys Brunch',
        link: 'https://t.me/church_men',
        defaultLocation: 'Кафе'
    },
    {
        id: 'custom',
        title: '✨ Другое (Ввести вручную)',
        link: '#',
        defaultLocation: ''
    }
];

const EventList = ({ events }) => {
    if (!events || events.length === 0) {
        return <p style={eventsStyles.noEvents}>Нет запланированных событий</p>;
    }

    return (
        <div style={eventsStyles.eventList}>
            {events.map((event) => (
                <div key={event.id} style={eventsStyles.eventItem}>
                    <div style={eventsStyles.eventMainInfo}>
                        <span style={eventsStyles.eventTitle}>{event.title}</span>
                        <span style={eventsStyles.eventDatetime}>
                            📅 {event.date} • ⏰ {event.time}
                        </span>
                        {event.location && (
                            <span style={eventsStyles.eventLocation}>
                                📍 {event.location}
                            </span>
                        )}
                    </div>
                    {event.link && event.link !== '#' && (
                        <a 
                            href={event.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={eventsStyles.eventLink}
                        >
                            Подробнее →
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

function Events({ onNavigate }) {
    const [data, setData] = React.useState({ week: [], month: [] });
    const [isLoading, setIsLoading] = React.useState(true);

    // Авторизация
    const [token, setToken] = React.useState(() => localStorage.getItem('admin_token') || '');
    const [loginInput, setLoginInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [isAdminVisible, setIsAdminVisible] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Форма создания из шаблона
    const [selectedTemplateId, setSelectedTemplateId] = React.useState(EVENT_TEMPLATES[0].id);
    const [customTitle, setCustomTitle] = React.useState('');
    const [customLink, setCustomLink] = React.useState('');
    const [formDate, setFormDate] = React.useState('');
    const [formTime, setFormTime] = React.useState('');
    const [formLocation, setFormLocation] = React.useState(EVENT_TEMPLATES[0].defaultLocation);
    const [formSection, setFormSection] = React.useState('week');

    // Загрузка событий с сервера
    const fetchEvents = () => {
        setIsLoading(true);
        fetch(`${API_URL}/api/events`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Ошибка загрузки событий:', err);
                setIsLoading(false);
            });
    };

    React.useEffect(() => {
        fetchEvents();
    }, []);

    // При смене шаблона обновляем локацию по умолчанию
    const handleTemplateChange = (templateId) => {
        setSelectedTemplateId(templateId);
        const template = EVENT_TEMPLATES.find((t) => t.id === templateId);
        if (template && templateId !== 'custom') {
            setFormLocation(template.defaultLocation);
        }
    };

    // Вход в админку
    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: loginInput, password: passwordInput })
        })
            .then((res) => {
                if (!res.ok) throw new Error('Неверный логин или пароль');
                return res.json();
            })
            .then((resData) => {
                setToken(resData.token);
                localStorage.setItem('admin_token', resData.token);
                setLoginInput('');
                setPasswordInput('');
            })
            .catch((err) => alert(err.message));
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('admin_token');
    };

    // Добавление события
    const handleAddEvent = () => {
        if (!formDate.trim() || !formTime.trim()) {
            alert('Укажите дату и время!');
            return;
        }

        const template = EVENT_TEMPLATES.find((t) => t.id === selectedTemplateId);
        const isCustom = selectedTemplateId === 'custom';

        const title = isCustom ? customTitle.trim() : template.title;
        const link = isCustom ? customLink.trim() : template.link;

        if (!title) {
            alert('Укажите название события!');
            return;
        }

        fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                date: formDate.trim(),
                time: formTime.trim(),
                location: formLocation.trim(),
                link,
                section: formSection
            })
        })
            .then((res) => {
                if (!res.ok) throw new Error('Ошибка при добавлении');
                return res.json();
            })
            .then(() => {
                fetchEvents();
                setFormDate('');
                setFormTime('');
            })
            .catch((err) => alert(err.message));
    };

    // Удаление события
    const handleDeleteEvent = (section, id) => {
        if (!confirm('Удалить событие?')) return;

        fetch(`${API_URL}/api/events/${section}/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (!res.ok) throw new Error('Ошибка удаления');
                fetchEvents();
            })
            .catch((err) => alert(err.message));
    };

    const allEvents = [
        ...(data.week || []).map((e) => ({ ...e, section: 'week' })),
        ...(data.month || []).map((e) => ({ ...e, section: 'month' }))
    ];

    return (
        <div style={eventsStyles.container}>
            {/* ШАПКА */}
            <div style={eventsHeaderStyles.headerWrapper}>
                <div style={eventsHeaderStyles.headerContainer}>
                    <div style={eventsHeaderStyles.leftSide} onClick={() => onNavigate('home')}>
                        <img
                            src="src/media/black-logo.png"
                            alt="REC CHURCH"
                            style={eventsHeaderStyles.logoImg}
                        />
                        <div style={eventsHeaderStyles.titleBlock}>
                            <span style={eventsHeaderStyles.mainTitle}>ПРИМИРЕНИЕ</span>
                            <span style={eventsHeaderStyles.subTitle}>ЦЕРКОВЬ</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={eventsHeaderStyles.menuButton}
                        aria-label="Меню"
                    >
                        <div style={eventsHeaderStyles.bar}></div>
                        <div style={eventsHeaderStyles.bar}></div>
                        <div style={eventsHeaderStyles.bar}></div>
                    </button>
                </div>

                {isMenuOpen && (
                    <div style={eventsHeaderStyles.dropdownMenu}>
                        <div style={eventsHeaderStyles.dropdownHeader}>Навигация</div>
                        {[
                            { key: 'about', label: 'О церкви' },
                            { key: 'events', label: 'События' },
                            { key: 'communication', label: 'Общение' },
                            { key: 'ministries', label: 'Наши служения' },
                            { key: 'team', label: 'Команда' },
                            { key: 'baptism', label: 'Крещение' }
                        ].map((item) => (
                            <div
                                key={item.key}
                                style={eventsHeaderStyles.dropdownItem}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    onNavigate(item.key);
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* СПИСОК СОБЫТИЙ */}
            <div style={eventsStyles.contentSection}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#70778A' }}>
                        Загрузка расписания...
                    </div>
                ) : (
                    <>
                        <h2 style={eventsStyles.sectionTitle}>РАСПИСАНИЕ НЕДЕЛИ</h2>
                        <EventList events={data.week} />

                        <h2 style={{ ...eventsStyles.sectionTitle, marginTop: '30px' }}>РАСПИСАНИЕ МЕСЯЦА</h2>
                        <EventList events={data.month} />
                    </>
                )}

                <div style={eventsStyles.disclaimer}>
                    * Информация может изменяться.<br />
                    Просьба уточнять актуальное расписание каждую неделю.
                </div>
            </div>

            {/* КНОПКА АДМИН-ПАНЕЛИ */}
            <button
                style={eventsStyles.adminToggle}
                onClick={() => setIsAdminVisible(!isAdminVisible)}
            >
                {isAdminVisible ? ' Закрыть управление' : ' Управление событиями'}
            </button>

            {/* АДМИН-ПАНЕЛЬ */}
            {isAdminVisible && (
                <div style={eventsStyles.adminPanel}>
                    {!token ? (
                        /* Форма авторизации */
                        <form onSubmit={handleLogin} style={eventsStyles.adminForm}>
                            <h3 style={eventsStyles.adminTitle}> Вход для администратора</h3>
                            <input
                                type="text"
                                style={eventsStyles.formInput}
                                placeholder="Логин"
                                value={loginInput}
                                onChange={(e) => setLoginInput(e.target.value)}
                            />
                            <input
                                type="password"
                                style={eventsStyles.formInput}
                                placeholder="Пароль"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                            />
                            <button type="submit" style={eventsStyles.formButton}>
                                Войти
                            </button>
                        </form>
                    ) : (
                        /* Панель создания событии из шаблонов */
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={eventsStyles.adminTitle}>➕ Добавить из шаблона</h3>
                                <button onClick={handleLogout} style={eventsStyles.logoutBtn}>
                                    Выйти
                                </button>
                            </div>

                            <div style={eventsStyles.adminForm}>
                                {/* Выбор типа события */}
                                <label style={eventsStyles.label}>Выберите тип мероприятия:</label>
                                <select
                                    style={eventsStyles.formSelect}
                                    value={selectedTemplateId}
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                >
                                    {EVENT_TEMPLATES.map((tmpl) => (
                                        <option key={tmpl.id} value={tmpl.id}>
                                            {tmpl.title}
                                        </option>
                                    ))}
                                </select>

                                {/* Поля для произвольного события */}
                                {selectedTemplateId === 'custom' && (
                                    <>
                                        <input
                                            type="text"
                                            style={eventsStyles.formInput}
                                            placeholder="Название события"
                                            value={customTitle}
                                            onChange={(e) => setCustomTitle(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            style={eventsStyles.formInput}
                                            placeholder="Ссылка (необязательно)"
                                            value={customLink}
                                            onChange={(e) => setCustomLink(e.target.value)}
                                        />
                                    </>
                                )}

                                {/* Переменные данные: Дата, Время, Адрес */}
                                <div style={eventsStyles.formRow}>
                                    <input
                                        type="text"
                                        style={eventsStyles.formInput}
                                        placeholder="Дата (например: Ср. 02.09)"
                                        value={formDate}
                                        onChange={(e) => setFormDate(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        style={eventsStyles.formInput}
                                        placeholder="Время (например: 19:00)"
                                        value={formTime}
                                        onChange={(e) => setFormTime(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="text"
                                    style={eventsStyles.formInput}
                                    placeholder="Адрес / Локация"
                                    value={formLocation}
                                    onChange={(e) => setFormLocation(e.target.value)}
                                />

                                <select
                                    style={eventsStyles.formSelect}
                                    value={formSection}
                                    onChange={(e) => setFormSection(e.target.value)}
                                >
                                    <option value="week"> В расписание недели</option>
                                    <option value="month"> В расписание месяца</option>
                                </select>

                                <button style={eventsStyles.formButton} onClick={handleAddEvent}>
                                    Опубликовать событие
                                </button>
                            </div>

                            <h3 style={{ ...eventsStyles.adminTitle, marginTop: '20px' }}>📋 Текущие события</h3>
                            <div style={eventsStyles.adminList}>
                                {allEvents.length === 0 ? (
                                    <div style={eventsStyles.adminEmpty}>Событий нет</div>
                                ) : (
                                    allEvents.map((event) => (
                                        <div key={event.id} style={eventsStyles.adminItem}>
                                            <div style={eventsStyles.adminItemInfo}>
                                                <strong>{event.title}</strong>
                                                <div>{event.date} • {event.time} ({event.section === 'week' ? 'Неделя' : 'Месяц'})</div>
                                                {event.location && <div style={{ color: '#70778A' }}>📍 {event.location}</div>}
                                            </div>
                                            <button
                                                style={eventsStyles.adminDeleteBtn}
                                                onClick={() => handleDeleteEvent(event.section, event.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const eventsStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
    },
    contentSection: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '20px',
        padding: '20px 16px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        color: '#1C1E26',
        marginBottom: '12px',
        paddingBottom: '4px',
        borderBottom: '2px solid #3390EC',
        display: 'inline-block'
    },
    eventList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    eventItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 14px',
        borderRadius: '12px',
        background: '#F7F8FC',
        border: '1px solid #E8EAF2',
    },
    eventMainInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    eventTitle: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#1C1E26',
    },
    eventDatetime: {
        fontSize: '12px',
        fontWeight: '500',
        color: '#70778A',
    },
    eventLocation: {
        fontSize: '11px',
        fontWeight: '500',
        color: '#3390EC',
    },
    eventLink: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#3390EC',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        marginLeft: '8px'
    },
    noEvents: {
        color: '#70778A',
        fontSize: '14px',
        fontStyle: 'italic',
    },
    disclaimer: {
        marginTop: '24px',
        paddingTop: '12px',
        borderTop: '1px dashed #E8EAF2',
        fontSize: '12px',
        color: '#70778A',
        textAlign: 'center',
        lineHeight: '1.4'
    },
    adminToggle: {
        background: '#E8EAF2',
        border: 'none',
        padding: '10px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#1C1E26',
        cursor: 'pointer',
    },
    adminPanel: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '20px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    adminTitle: {
        fontSize: '15px',
        fontWeight: '700',
        margin: 0,
    },
    label: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#70778A',
    },
    logoutBtn: {
        background: 'none',
        border: 'none',
        color: '#D32F2F',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    adminForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    formRow: {
        display: 'flex',
        gap: '8px'
    },
    formInput: {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #d0d7de',
        borderRadius: '8px',
        fontSize: '13px',
        boxSizing: 'border-box'
    },
    formSelect: {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #d0d7de',
        borderRadius: '8px',
        fontSize: '13px',
        background: '#fff',
        boxSizing: 'border-box'
    },
    formButton: {
        background: '#3390EC',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    adminList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    adminItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        background: '#F7F8FC',
        borderRadius: '8px',
        fontSize: '12px'
    },
    adminDeleteBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px'
    },
    adminEmpty: {
        fontSize: '12px',
        color: '#70778A',
        fontStyle: 'italic'
    }
};

const eventsHeaderStyles = {
    headerWrapper: {
        position: 'relative'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '10px 16px',
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer'
    },
    logoImg: {
        height: '36px',
        objectFit: 'contain',
    },
    titleBlock: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.1',
    },
    mainTitle: {
        fontWeight: '700',
        fontSize: '16px',
        color: '#000000',
    },
    subTitle: {
        fontWeight: '500',
        fontSize: '16px',
        color: '#000000',
    },
    menuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '6px',
    },
    bar: {
        width: '30px',
        height: '6px',
        backgroundColor: '#3390EC',
        borderRadius: '5px',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '60px',
        right: '0',
        width: '200px',
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '8px 0',
        zIndex: 100
    },
    dropdownHeader: {
        padding: '6px 16px',
        fontSize: '11px',
        fontWeight: '700',
        color: '#70778A',
        textTransform: 'uppercase'
    },
    dropdownItem: {
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#1C1E26',
        cursor: 'pointer',
        borderTop: '1px solid #F3F4F8'
    }
};