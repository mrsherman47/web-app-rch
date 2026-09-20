function App() {
    const [currentPage, setCurrentPage] = React.useState('home');
    const [pageParams, setPageParams] = React.useState({});

    // onNavigate(pageKey, params?) — второй аргумент необязательный
    const handleNavigate = (pageKey, params = {}) => {
        setCurrentPage(pageKey);
        setPageParams(params);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={handleNavigate} />;
            case 'about':
                return <About onNavigate={handleNavigate} />;
            case 'events':
                return <Events onNavigate={handleNavigate} />;
            case 'event-details':
                return (
                    <EventDetails
                        eventId={pageParams.eventId}
                        onNavigate={handleNavigate}
                    />
                );
            case 'communication':
                return <Community onNavigate={handleNavigate} />;
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);