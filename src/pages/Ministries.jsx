function Ministries({ onNavigate }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>    
            {/* Выпадающая шапка (тулбар) с меню */}
            <div style={baptismHeaderStyles.headerWrapper}>  
                <div style={baptismHeaderStyles.headerContainer}>  
                    <div style={baptismHeaderStyles.leftSide} onClick={() => onNavigate('home')}>  
                        <img  
                            src="src/media/black-logo.png"  
                            alt="REC CHURCH"  
                            style={baptismHeaderStyles.logoImg}  
                        />  
                        <div style={baptismHeaderStyles.titleBlock}>  
                            <span style={baptismHeaderStyles.mainTitle}>ПРИМИРЕНИЕ</span>  
                            <span style={baptismHeaderStyles.subTitle}>ЦЕРКОВЬ</span>  
                        </div>  
                    </div>  

                    <button  
                        onClick={() => setIsMenuOpen(!isMenuOpen)}  
                        style={baptismHeaderStyles.menuButton}  
                        aria-label="Меню"  
                    >  
                        <div style={baptismHeaderStyles.bar}></div>  
                        <div style={baptismHeaderStyles.bar}></div>  
                        <div style={baptismHeaderStyles.bar}></div>  
                    </button>  
                </div>  

                {isMenuOpen && (  
                    <div style={baptismHeaderStyles.dropdownMenu}>  
                        <div style={baptismHeaderStyles.dropdownHeader}>Навигация</div>  
                        {[  
                            { key: 'min', label: 'О церкви' },  
                            { key: 'events', label: 'События' },  
                            { key: 'communication', label: 'Общение' },  
                            { key: 'ministries', label: 'Наши служения' },  
                            { key: 'team', label: 'Команда' },  
                            { key: 'baptism', label: 'Крещение' }  
                        ].map((item) => (  
                            <div  
                                key={item.key}  
                                style={baptismHeaderStyles.dropdownItem}  
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

            <div style={styles.heroBanner}>
                <div style={styles.heroTopContent}>
                    <div style={styles.heroSubTop}>rec.church · minsk</div>
                    <h1 style={styles.heroTitle}>
                        Собрания в церкви<br /> 
                        “Примирение”
                    </h1>
                </div>
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
                            <td style={styles.navText}>
                                Навигация
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                <a
                                    href="#min"
                                    onClick={(e) => { e.preventDefault(); onNavigate('min'); }}
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

const baptismHeaderStyles = {  
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
        backgroundColor: '#3390EC',
        borderRadius: '5px',
    },

    heroBanner: {
        position: 'relative',
        width: '100%',
        minHeight: '380px',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("src/media/app_media/2111.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
    },

    heroBottomContent: {
        position: 'relative',
        zIndex: 2,
        color: '#ffffff',
    },

    heroTopContent: {
        position: 'relative',
        zIndex: 2,
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },

    heroSubTop: {
        fontSize: '13px',
        opacity: 0.8,
        letterSpacing: '0.5px',
        textAlign: 'center',
    },

    heroTitle: {
        fontSize: '24px',
        fontWeight: '800',
        lineHeight: '1.2',
        margin: 0,
        textAlign: 'left',
    },

    heroDescription: {
        fontSize: '14px',
        lineHeight: '1.4',
        margin: 0,
        opacity: 0.9,
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

function navigate(page) {
    console.log('Переход:', page);
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <Ministries onNavigate={navigate} />
);