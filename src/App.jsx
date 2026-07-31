function Home({ onNavigate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Шапка профиля */}
            <div style={styles.headerContainer}>
                <div style={styles.leftSide}>
                    <img
                        src="src/media/black-logo.png"
                        alt="REC CHURCH"
                        style={styles.logoImg}
                    />
                    <div style={styles.titleBlock}>
                        <span style={styles.mainTitle}>ПРИМИРЕНИЕ</span>
                        <span style={styles.subTitle}>ЦЕРКОВЬ</span>
                    </div>
                </div>

                <button
                    onClick={() => alert('Меню нажато!')}
                    style={styles.menuButton}
                    aria-label="Меню"
                >
                    <div style={styles.bar}></div>
                    <div style={styles.bar}></div>
                    <div style={styles.bar}></div>
                </button>
            </div>

            {/* Блок навигации */}
            <div style={styles.navCard}>
                
                    <div style={styles.leftSide}>
                        <img
                            src="src/media/black-logo.png"
                            alt="REC CHURCH"
                            style={styles.logoImg}
                        />
                        <div style={styles.titleBlock}>
                            <span style={styles.mainTitle}>ПРИМИРЕНИЕ</span>
                            <span style={styles.subTitle}>ЦЕРКОВЬ</span>
                        </div>
                    </div>

                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td style={styles.navtextInt}>
                                Интернациональная церковь
                            </td>
                        </tr>
                        <tr>
                            <td styles={styles.navText}>
                                Навигация
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                <a
                                    href="#about"
                                    onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
                                    style={styles.link}
                                >
                                    О церкви
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                <a
                                    href="#events"
                                    onClick={(e) => { e.preventDefault(); onNavigate('events'); }}
                                    style={styles.link}
                                >
                                    События
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                <a
                                    href="#communication"
                                    onClick={(e) => { e.preventDefault(); onNavigate('communication'); }}
                                    style={styles.link}
                                >
                                    Общение
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                <a
                                    href="#ministries"
                                    onClick={(e) => { e.preventDefault(); onNavigate('ministries'); }}
                                    style={styles.link}
                                >
                                    Наши служения
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                <a
                                    href="#team"
                                    onClick={(e) => { e.preventDefault(); onNavigate('team'); }}
                                    style={styles.link}
                                >
                                    Команда
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellLast}>
                                <a
                                    href="#baptism"
                                    onClick={(e) => { e.preventDefault(); onNavigate('baptism'); }}
                                    style={styles.link}
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

const styles = {
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

    bottomHeaderContainer: {
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '10px 16px',
        marginBottom: '15px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    },

    leftSide: {
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
        alignItems: 'center',
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
        backgroundColor: '#2481cc',
        borderRadius: '5px',
    },

    navCard: {
        background: '#fff',
        padding: '20px',
        borderRadius: '20px',
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
        padding: '30x 0 15px',
        color: '#1C1E26',
        fontWeight: '600',
        fontSize: '16px',
        display: 'block',
    },

    tableCell: {
        padding: '3px 0',
        //borderBottom: '1px solid #eee',
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

function navigate(page) {
    console.log('Переход:', page);
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <Home onNavigate={navigate} />
);
