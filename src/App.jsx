// Пример отдельного компонента страницы "О церкви" (это ваш аналог About.jsx)
function AboutPage({ onNavigate }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>О церкви</h2>
            <p>Интернациональная церковь REC CHURCH...</p>
            <button onClick={() => onNavigate('home')} style={styles.button}>
                Назад на главную
            </button>
        </div>
    );
}

// Пример Главной страницы (Home.jsx)
function HomePage({ onNavigate }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>ПРИМИРЕНИЕ ЦЕРКОВЬ</h2>
            <p>Навигация:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                    <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} style={styles.link}>
                        О церкви
                    </a>
                </li>
                {/* Здесь будут другие ссылки: События, Общение и т.д. */}
            </ul>
        </div>
    );
}

// Главный компонент App, который решает, какую страницу сейчас отобразить
function App() {
    // Состояние хранит название текущей страницы (по умолчанию 'home')
    const [currentPage, setCurrentPage] = React.useState('home');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Шапка или общий дизайн мини-приложения */}
            <header style={{ padding: '10px 20px', borderBottom: '1px solid #eee' }}>
                <span style={{ fontWeight: 'bold' }}>REC.CHURCH</span>
            </header>

            {/* Тело страницы: в зависимости от currentPage показываем нужный компонент */}
            <main style={{ flex: 1 }}>
                {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
                {currentPage === 'about' && <AboutPage onNavigate={setCurrentPage} />}
            </main>
        </div>
    );
}

// Простые стили для примера кнопок и ссылок
const styles = {
    button: {
        background: 'var(--button-color, #2481cc)',
        color: '#fff',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    link: {
        color: '#1C1E26',
        textDecoration: 'none',
        fontSize: '18px',
        display: 'block',
        margin: '10px 0',
        fontWeight: '600'
    }
};

// Запуск приложения
ReactDOM.createRoot(document.getElementById('root')).render(<App />);