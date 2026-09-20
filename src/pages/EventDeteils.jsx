function EventDetails({ eventId, onNavigate }) {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (!eventId) {
            setError('Не указан ID события');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        fetch(`${API_URL}/api/events/${eventId}`)
            .then((r) => {
                if (r.status === 404) throw new Error('Событие не найдено');
                if (!r.ok) throw new Error('Ошибка загрузки');
                return r.json();
            })
            .then((d) => {
                setData(d); // { event, page }
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [eventId]);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#70778A' }}>
                Загрузка события…
            </div>
        );
    }

    if (error || !data || !data.event) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '48px' }}>😕</div>
                <p style={{ color: '#D32F2F', fontWeight: '600', margin: 0 }}>
                    {error || 'Событие недоступно'}
                </p>
                <button
                    onClick={() => onNavigate('events')}
                    style={{
                        background: '#3390EC',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    ← К списку событий
                </button>
            </div>
        );
    }

    const { event, page } = data;

    // Если страница не привязана (например, событие удалили, а ссылку сохранили) —
    // рендерим простое отображение
    if (!page) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                    background: '#fff',
                    border: '1.5px solid #d0d7de',
                    borderRadius: '25px',
                    padding: '24px 20px'
                }}>
                    <h1 style={{ margin: 0, fontSize: '24px' }}>{event.title}</h1>
                    <p style={{ color: '#70778A' }}>
                        {event.date} • {event.time}
                    </p>
                </div>
                <button
                    onClick={() => onNavigate('events')}
                    style={{
                        background: 'transparent',
                        border: '1.5px solid #d0d7de',
                        padding: '12px',
                        borderRadius: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    ← Назад к событиям
                </button>
            </div>
        );
    }

    // Выбираем шаблон по категории
    const PageComponent = PAGE_TEMPLATES[event.category] || PAGE_TEMPLATES.custom;

    return <PageComponent event={event} page={page} onNavigate={onNavigate} />;
}