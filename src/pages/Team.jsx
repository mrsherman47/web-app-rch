function Team({ onNavigate }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>    
            {/* Выпадающая шапка (тулбар) с меню */}
            <div style={teamStyles.headerWrapper}>
                <div style={teamStyles.headerContainer}>
                    <div style={teamStyles.leftSide} onClick={() => onNavigate('home')}>
                        <img
                            src="src/media/black-logo.png"
                            alt="REC CHURCH"
                            style={teamStyles.logoImg}
                        />
                        <div style={teamStyles.titleBlock}>
                            <span style={teamStyles.mainTitle}>ПРИМИРЕНИЕ</span>
                            <span style={teamStyles.subTitle}>ЦЕРКОВЬ</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={teamStyles.menuButton}
                        aria-label="Меню"
                    >
                        <div style={teamStyles.bar}></div>
                        <div style={teamStyles.bar}></div>
                        <div style={teamStyles.bar}></div>
                    </button>
                </div>

                {isMenuOpen && (
                    <div style={teamStyles.dropdownMenu}>
                        <div style={teamStyles.dropdownHeader}>Навигация</div>
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
                                style={teamStyles.dropdownItem}
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

            {/* Блок с описанием команды */}
            <div style={teamStyles.descriptionCard}>
                <p style={teamStyles.cardText}>
                    123456789098765432
                </p>
            </div>

            {/* Блок навигации с эмблемой сверху и разделительной полоской */}
            <div style={teamStyles.navCard}>
                <div style={teamStyles.leftSideStatic}>
                    <img
                        src="src/media/black-logo.png"
                        alt="REC CHURCH"
                        style={teamStyles.logoImg}
                    />
                    <div style={teamStyles.titleBlock}>
                        <span style={teamStyles.mainTitle}>ПРИМИРЕНИЕ</span>
                        <span style={teamStyles.subTitle}>ЦЕРКОВЬ</span>
                    </div>
                </div>

                <div style={teamStyles.divider}></div>

                <table style={teamStyles.table}>
                    <tbody>
                        <tr>
                            <td style={teamStyles.navtextInt}>
                                Интернациональная церковь
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.navText}>
                                Навигация
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.tableCell}>
                                <a
                                    href="#about"
                                    onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
                                    style={teamStyles.link}
                                >
                                    О церкви
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.tableCell}>
                                <a
                                    href="#events"
                                    onClick={(e) => { e.preventDefault(); onNavigate('events'); }}
                                    style={teamStyles.link}
                                >
                                    События
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.tableCell}>
                                <a
                                    href="#communication"
                                    onClick={(e) => { e.preventDefault(); onNavigate('communication'); }}
                                    style={teamStyles.link}
                                >
                                    Общение
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.tableCell}>
                                <a
                                    href="#ministries"
                                    onClick={(e) => { e.preventDefault(); onNavigate('ministries'); }}
                                    style={teamStyles.link}
                                >
                                    Наши служения
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.tableCell}>
                                <a
                                    href="#team"
                                    onClick={(e) => { e.preventDefault(); onNavigate('team'); }}
                                    style={teamStyles.link}
                                >
                                    Команда
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={teamStyles.tableCellLast}>
                                <a
                                    href="#baptism"
                                    onClick={(e) => { e.preventDefault(); onNavigate('baptism'); }}
                                    style={teamStyles.link}
                                >
                                    Крещение
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const teamStyles = {
    headerWrapper: {
        position: 'relative',
        zIndex: 100,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '10px 16px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
    },
    leftSideStatic: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
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
        letterSpacing: '0.5px',
        color: '#000000',
    },
    subTitle: {
        fontWeight: '500',
        fontSize: '16px',
        letterSpacing: '0.5px',
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
        zIndex: 100,
    },
    dropdownHeader: {
        padding: '6px 16px',
        fontSize: '11px',
        fontWeight: '700',
        color: '#70778A',
        textTransform: 'uppercase',
    },
    dropdownItem: {
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#1C1E26',
        cursor: 'pointer',
        borderTop: '1px solid #F3F4F8',
    },
    descriptionCard: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    },
    cardText: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333333',
        margin: 0,
    },
    divider: {
        width: '100%',
        height: '1px',
        backgroundColor: '#e1e4e8',
        margin: '16px 0',
    },
    navCard: {
        background: '#fff',
        padding: '20px',
        borderRadius: '25px',
        border: '1.5px solid #d0d7de',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    navtextInt: {
        padding: '20px 0 10px',
        color: '#70778A',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '16px',
        display: 'block',
    },
    navText: {
        padding: '15px 0 10px',
        color: '#1C1E26',
        fontWeight: '600',
        fontSize: '16px',
        display: 'block',
    },
    tableCell: {
        padding: '3px 0',
    },
    tableCellLast: {
        padding: '5px 0',
    },
    link: {
        color: '#70778A',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '16px',
        display: 'block',
    },
};