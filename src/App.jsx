function App() {
    // Текущая страница по умолчанию
    const [currentPage, setCurrentPage] = React.useState('home');

    // Функция переключения
    const handleNavigate = (pageKey) => {
        setCurrentPage(pageKey);
        window.scrollTo(0, 0); // Сброс прокрутки наверх
    };

    // Отрисовка нужной страницы
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={handleNavigate} />;
            case 'about':
                return <About onNavigate={handleNavigate} />;
            case 'events':
                return <Events onNavigate={handleNavigate} />;
            case 'communication':
                return <Communication onNavigate={handleNavigate} />;
            case 'ministries':
                return <Ministries onNavigate={handleNavigate} />;
            case 'team':
                return <Team onNavigate={handleNavigate} />;
            case 'baptism':
                return <Baptism onNavigate={handleNavigate} />;
            default:
                return <Home onNavigate={handleNavigate} />;
        }
    };

    return (
        <div style={{ padding: '16px', minHeight: '100vh', background: '#f4f5f8' }}>
            {renderPage()}
        </div>
    );
}

// Рендеринг в DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);