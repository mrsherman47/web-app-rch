// ============================================================
// ОБЩИЕ ЧАСТИ ДЛЯ ВСЕХ ШАБЛОНОВ
// ============================================================

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function formatDateDisplay(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    const day = WEEKDAYS_SHORT[d.getDay()];
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}, ${dd}.${mm}`;
}

// Шапка (копия из Events.jsx — можно потом вынести в общий файл)
const DetailHeader = ({ onNavigate, isMenuOpen, setIsMenuOpen }) => (
    <div style={detailHeaderStyles.wrapper}>
        <div style={detailHeaderStyles.container}>
            <div style={detailHeaderStyles.leftSide} onClick={() => onNavigate('home')}>
                <img src="src/media/black-logo.png" alt="REC CHURCH" style={detailHeaderStyles.logo} />
                <div style={detailHeaderStyles.titleBlock}>
                    <span style={detailHeaderStyles.mainTitle}>ПРИМИРЕНИЕ</span>
                    <span style={detailHeaderStyles.subTitle}>ЦЕРКОВЬ</span>
                </div>
            </div>
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={detailHeaderStyles.menuButton}
                aria-label="Меню"
            >
                <div style={detailHeaderStyles.bar}></div>
                <div style={detailHeaderStyles.bar}></div>
                <div style={detailHeaderStyles.bar}></div>
            </button>
        </div>
        {isMenuOpen && (
            <div style={detailHeaderStyles.dropdown}>
                <div style={detailHeaderStyles.dropdownHeader}>Навигация</div>
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
                        style={detailHeaderStyles.dropdownItem}
                        onClick={() => { setIsMenuOpen(false); onNavigate(item.key); }}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Кнопка «← Назад к событиям»
const BackButton = ({ onNavigate }) => (
    <button
        onClick={() => onNavigate('events')}
        style={detailStyles.backButton}
    >
        ← Назад к событиям
    </button>
);

// ============================================================
// 5 ШАБЛОНОВ (заглушки — потом заменишь на свою вёрстку)
// ============================================================

function SundayServicePage({ event, page, onNavigate }) {
    const c = page.content || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div style={detailStyles.page}>
            <DetailHeader
                onNavigate={onNavigate}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            <div style={detailStyles.hero}>
                <div style={detailStyles.heroKicker}>ВОСКРЕСНОЕ СОБРАНИЕ</div>
                <h1 style={detailStyles.heroTitle}>{c.heroTitle || event.title}</h1>
                <div style={detailStyles.heroDate}>
                    {formatDateDisplay(event.date)} • {event.time}
                </div>
                {event.location && (
                    <div style={detailStyles.heroLocation}>{event.location}</div>
                )}
            </div>

            {c.description && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>О служении</h2>
                    <p style={detailStyles.text}>{c.description}</p>
                </div>
            )}

            {c.speaker && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>Спикер</h2>
                    <p style={detailStyles.text}>{c.speaker}</p>
                </div>
            )}

            {Array.isArray(c.schedule) && c.schedule.length > 0 && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>Программа</h2>
                    <div style={detailStyles.timeline}>
                        {c.schedule.map((row, i) => (
                            <div key={i} style={detailStyles.timelineRow}>
                                <span style={detailStyles.timelineTime}>{row.time}</span>
                                <span style={detailStyles.timelineLabel}>{row.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {event.link && event.link !== '#' && (
                <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={detailStyles.cta}
                >
                    Перейти в чат →
                </a>
            )}

            <BackButton onNavigate={onNavigate} />
        </div>
    );
}

function PrayerPage({ event, page, onNavigate }) {
    const c = page.content || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div style={detailStyles.page}>
            <DetailHeader onNavigate={onNavigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div style={detailStyles.hero}>
                <div style={detailStyles.heroKicker}>МОЛИТВЕННОЕ СЛУЖЕНИЕ</div>
                <h1 style={detailStyles.heroTitle}>{c.heroTitle || event.title}</h1>
                <div style={detailStyles.heroDate}>{formatDateDisplay(event.date)} • {event.time}</div>
                {event.location && <div style={detailStyles.heroLocation}>{event.location}</div>}
            </div>
            {c.description && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>О служении</h2>
                    <p style={detailStyles.text}>{c.description}</p>
                </div>
            )}
            {event.link && event.link !== '#' && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" style={detailStyles.cta}>
                    Перейти в чат →
                </a>
            )}
            <BackButton onNavigate={onNavigate} />
        </div>
    );
}

function HomeGroupPage({ event, page, onNavigate }) {
    const c = page.content || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div style={detailStyles.page}>
            <DetailHeader onNavigate={onNavigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div style={detailStyles.hero}>
                <div style={detailStyles.heroKicker}>ДОМАШНЯЯ ГРУППА</div>
                <h1 style={detailStyles.heroTitle}>{c.heroTitle || event.title}</h1>
                <div style={detailStyles.heroDate}>{formatDateDisplay(event.date)} • {event.time}</div>
                {event.location && <div style={detailStyles.heroLocation}>{event.location}</div>}
            </div>
            {c.description && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>Что будет</h2>
                    <p style={detailStyles.text}>{c.description}</p>
                </div>
            )}
            {event.link && event.link !== '#' && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" style={detailStyles.cta}>
                    Уточнить в чате →
                </a>
            )}
            <BackButton onNavigate={onNavigate} />
        </div>
    );
}

function BoysBrunchPage({ event, page, onNavigate }) {
    const c = page.content || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div style={detailStyles.page}>
            <DetailHeader onNavigate={onNavigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div style={detailStyles.hero}>
                <div style={detailStyles.heroKicker}>BOYS BRUNCH</div>
                <h1 style={detailStyles.heroTitle}>{c.heroTitle || event.title}</h1>
                <div style={detailStyles.heroDate}>{formatDateDisplay(event.date)} • {event.time}</div>
                {event.location && <div style={detailStyles.heroLocation}>{event.location}</div>}
            </div>
            {c.description && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>О встрече</h2>
                    <p style={detailStyles.text}>{c.description}</p>
                </div>
            )}
            {event.link && event.link !== '#' && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" style={detailStyles.cta}>
                    Перейти в чат →
                </a>
            )}
            <BackButton onNavigate={onNavigate} />
        </div>
    );
}

function TimeCodePage({ event, page, onNavigate }) {
    const c = page.content || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div style={detailStyles.page}>
            <DetailHeader onNavigate={onNavigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div style={detailStyles.hero}>
                <div style={detailStyles.heroKicker}>TIME CODE</div>
                <h1 style={detailStyles.heroTitle}>{c.heroTitle || event.title}</h1>
                <div style={detailStyles.heroDate}>{formatDateDisplay(event.date)} • {event.time}</div>
                {event.location && <div style={detailStyles.heroLocation}>{event.location}</div>}
            </div>
            {c.description && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>О встрече</h2>
                    <p style={detailStyles.text}>{c.description}</p>
                </div>
            )}
            <BackButton onNavigate={onNavigate} />
        </div>
    );
}

// Кастомная — сюда попадёт всё, что админ введёт вручную
function CustomPage({ event, page, onNavigate }) {
    const c = page.content || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div style={detailStyles.page}>
            <DetailHeader onNavigate={onNavigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div style={detailStyles.hero}>
                <div style={detailStyles.heroKicker}>СОБЫТИЕ</div>
                <h1 style={detailStyles.heroTitle}>{c.heroTitle || event.title}</h1>
                <div style={detailStyles.heroDate}>{formatDateDisplay(event.date)} • {event.time}</div>
                {event.location && <div style={detailStyles.heroLocation}>{event.location}</div>}
            </div>
            {c.description && (
                <div style={detailStyles.section}>
                    <h2 style={detailStyles.sectionTitle}>Описание</h2>
                    <p style={detailStyles.text}>{c.description}</p>
                </div>
            )}
            {event.link && event.link !== '#' && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" style={detailStyles.cta}>
                    Подробнее →
                </a>
            )}
            <BackButton onNavigate={onNavigate} />
        </div>
    );
}

// ============================================================
// РЕЕСТР ШАБЛОНОВ
// ============================================================

const PAGE_TEMPLATES = {
    sunday_service: SundayServicePage,
    prayer:         PrayerPage,
    home_group:     HomeGroupPage,
    boys_brunch:    BoysBrunchPage,
    time_code:      TimeCodePage,
    custom:         CustomPage
};

// ============================================================
// СТИЛИ (заглушечные — потом подгонишь под дизайн)
// ============================================================

const detailStyles = {
    page: { display: 'flex', flexDirection: 'column', gap: '16px' },
    hero: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    heroKicker: { fontSize: '11px', fontWeight: '700', letterSpacing: '1px', color: '#3390EC' },
    heroTitle: { fontSize: '26px', fontWeight: '700', color: '#1C1E26', margin: 0, lineHeight: 1.2 },
    heroDate: { fontSize: '16px', fontWeight: '600', color: '#1C1E26' },
    heroLocation: { fontSize: '14px', color: '#3390EC' },
    section: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#1C1E26', margin: 0 },
    text: { fontSize: '14px', color: '#3a3f4b', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' },
    timeline: { display: 'flex', flexDirection: 'column', gap: '8px' },
    timelineRow: { display: 'flex', gap: '14px', alignItems: 'baseline' },
    timelineTime: { fontSize: '14px', fontWeight: '700', color: '#3390EC', minWidth: '54px' },
    timelineLabel: { fontSize: '14px', color: '#1C1E26' },
    cta: {
        display: 'block',
        background: '#3390EC',
        color: '#fff',
        textAlign: 'center',
        padding: '14px',
        borderRadius: '14px',
        fontWeight: '700',
        textDecoration: 'none',
        fontSize: '15px'
    },
    backButton: {
        background: 'transparent',
        border: '1.5px solid #d0d7de',
        padding: '12px',
        borderRadius: '14px',
        fontWeight: '600',
        fontSize: '14px',
        color: '#1C1E26',
        cursor: 'pointer'
    }
};

const detailHeaderStyles = {
    wrapper: { position: 'relative' },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '10px 16px'
    },
    leftSide: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
    logo: { height: '36px', objectFit: 'contain' },
    titleBlock: { display: 'flex', flexDirection: 'column', lineHeight: '1.1' },
    mainTitle: { fontWeight: '700', fontSize: '16px', color: '#000000' },
    subTitle: { fontWeight: '500', fontSize: '16px', color: '#000000' },
    menuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '6px'
    },
    bar: { width: '30px', height: '6px', backgroundColor: '#3390EC', borderRadius: '5px' },
    dropdown: {
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