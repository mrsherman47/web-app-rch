function Community({ onNavigate }) {
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
                            { key: 'com', label: 'О церкви' },
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

            {/* Баннер страницы */}
            <div style={styles.heroBanner}>
                <div style={styles.heroTopContent}>
                    <div style={styles.heroSubTop}>rec.church · minsk</div>
                    <h1 style={styles.heroTitle}>
                        Общение в церкви<br />
                        “Примирение”
                    </h1>
                </div>

                <div style={styles.heroBottomContent}>
                    <p style={styles.heroDescription}>
                        Мы создаем пространство тепла, открытости и поддержки, где каждый может найти свой круг и разделить жизнь с другими.
                    </p>
                </div>
            </div>

            <div style={styles.contentSection}>
                <h2 style={styles.sectionTitle}>Культура поддержки</h2>
                <div style={styles.textContainer}>
                    <p style={styles.paragraph}>
                        Мы создаем культуру поддержки и ободрения — культуру, где человек имеет право на ошибку и не боится быть отвергнутым.
                    </p>
                    <p style={styles.paragraph}>
                        У нас действуют домашние группы, где каждый может участвовать в общении и иметь возможность быть услышанным.
                    </p>
                    <p style={styles.paragraph}>
                        Мы проводим молитвенные вечера, на которых через совместную молитву находим духовные силы для дальнейшего движения вперед.
                    </p>
                    <p style={styles.paragraph}>
                        Наши мужские встречи направлены на то, чтобы через ободрение и молитву оказать каждому необходимую поддержку.
                    </p>
                    <p style={styles.highlightedParagraph}>
                        Подробнее о молитвенных вечерах и мужских встречах вы можете узнать во вкладке{' '}
                        <a
                            href="#ministries"
                            onClick={(e) => { e.preventDefault(); onNavigate('ministries'); }}
                            style={styles.inlineLink}
                        >
                            Наши служения
                        </a>.
                    </p>
                </div>
            </div>

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

                <div style={styles.divider}></div>

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
                                    href="#com"
                                    onClick={(e) => { e.preventDefault(); onNavigate('com'); }}
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
        letterSpacing: '0.5px',
        color: '#000000',
    },
    subTitle: {
        fontWeight: '500',
        fontSize: '16px',
        letterSpacing: '0.5px',
        color: '#000000',
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
    contentSection: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        color: '#1C1E26',
        margin: 0,
        paddingBottom: '4px',
        borderBottom: '2px solid #3390EC',
        display: 'inline-block',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '4px',
    },
    paragraph: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#1C1E26',
        margin: 0,
    },
    highlightedParagraph: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#1C1E26',
        margin: 0,
    },
    inlineLink: {
        color: '#3390EC',
        textDecoration: 'none',
        fontWeight: '600',
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