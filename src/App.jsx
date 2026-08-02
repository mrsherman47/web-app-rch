function App() {
    const [currentPage, setCurrentPage] = React.useState('home');

    return (
        <div className="app-container">
            {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
            {currentPage === 'about' && <About onNavigate={setCurrentPage} />}
            
            {/* Заглушка для пока не готовых страниц */}
            {currentPage !== 'home' && currentPage !== 'about' && (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Страница "{currentPage}" находится в разработке</h2>
                    <button 
                        onClick={() => setCurrentPage('home')}
                        style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        На главную
                    </button>
                </div>
            )}
        </div>
    );
}

// Монтирование приложения в DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);