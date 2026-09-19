function About({ onNavigate }) {
    // Состояние для управления выпадающим меню сверху
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>    
            {/* ================= ВЕРХНИЙ ТУЛБАР С ВЫПАДАЮЩИМ МЕНЮ ================= */}
            <div style={aboutStyles.headerWrapper}>
                <div style={aboutStyles.headerContainer}>
                    <div style={aboutStyles.leftSide}>
                        <img
                            src="src/media/black-logo.png"
                            alt="REC CHURCH"
                            style={aboutStyles.logoImg}
                        />
                        <div style={aboutStyles.titleBlock}>
                            <span style={aboutStyles.mainTitle}>ПРИМИРЕНИЕ</span>
                            <span style={aboutStyles.subTitle}>ЦЕРКОВЬ</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={aboutStyles.menuButton}
                        aria-label="Меню"
                    >
                        <div style={aboutStyles.bar}></div>
                        <div style={aboutStyles.bar}></div>
                        <div style={aboutStyles.bar}></div>
                    </button>
                </div>

                {/* Выпадающее меню по клику на полоски */}
                {isMenuOpen && (
                    <div style={aboutStyles.dropdownCard}>
                        <table style={aboutStyles.dropdownTable}>
                            <tbody>
                                <tr>
                                    <td style={aboutStyles.dropdownNavText}>
                                        НАВИГАЦИЯ
                                    </td>
                                </tr>
                                <tr>
                                    <td style={aboutStyles.dropdownTableCell}>
                                        <a
                                            href="#about"
                                            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onNavigate('about'); }}
                                            style={aboutStyles.dropdownLink}
                                        >
                                            О церкви
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={aboutStyles.dropdownTableCell}>
                                        <a
                                            href="#events"
                                            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onNavigate('events'); }}
                                            style={aboutStyles.dropdownLink}
                                        >
                                            События
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={aboutStyles.dropdownTableCell}>
                                        <a
                                            href="#communication"
                                            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onNavigate('communication'); }}
                                            style={aboutStyles.dropdownLink}
                                        >
                                            Общение
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={aboutStyles.dropdownTableCell}>
                                        <a
                                            href="#ministries"
                                            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onNavigate('ministries'); }}
                                            style={aboutStyles.dropdownLink}
                                        >
                                            Наши служения
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={aboutStyles.dropdownTableCell}>
                                        <a
                                            href="#team"
                                            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onNavigate('team'); }}
                                            style={aboutStyles.dropdownLink}
                                        >
                                            Команда
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={aboutStyles.dropdownTableCellLast}>
                                        <a
                                            href="#baptism"
                                            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onNavigate('baptism'); }}
                                            style={aboutStyles.dropdownLink}
                                        >
                                            Крещение
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ================= О ЦЕРКВИ ================= */}
            <div style={aboutStyles.descriptionCard}>
                <h2 style={aboutStyles.cardTitle}>Церковь «Примирение»</h2>
                <p style={aboutStyles.cardText}>
                    Мы верим, что посреди пессимизма и тревог этого мира Радостная весть Иисуса Христа дарит человеку подлинную надежду и преображает жизнь. Наша цель — делать эту весть о Боге осязаемой и живой. В проповедях, теплом общении и личных поступках мы стремимся показать, что жизнь во Христе — это путь, полный любви, глубокой радости и мира.
                </p>
            </div>

            {/* ================= ДОКТРИНАЛЬНЫЕ УБЕЖДЕНИЯ ================= */}
            <div style={aboutStyles.descriptionCard}>
                <h2 style={aboutStyles.cardTitle}>Краткие доктринальные убеждения</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={aboutStyles.cardText}>
                        <strong>Пять Solas:</strong> Мы разделяем исторические принципы Реформации: спасение только благодатью (<span style={{ fontStyle: 'italic' }}>Sola Gratia</span>) и только через веру (<span style={{ fontStyle: 'italic' }}>Sola Fide</span>) во Христа (<span style={{ fontStyle: 'italic' }}>Solus Christus</span>), на основании Священного Писания (<span style={{ fontStyle: 'italic' }}>Sola Scriptura</span>) и во славу одного Бога (<span style={{ fontStyle: 'italic' }}>Soli Deo Gloria</span>).
                    </p>
                    <p style={aboutStyles.cardText}>
                        <strong>Писание:</strong> Библия (66 книг) — это богодухновенный, непогрешимый и высший авторитет для жизни и веры.
                    </p>
                    <p style={aboutStyles.cardText}>
                        <strong>Бог и Человек:</strong> Мы верим в единого Триединого Бога (Отец, Сын и Святой Дух). Человек сотворен по образу Божьему, но из-за грехопадения отчужден от Бога и нуждается в Спасителе.
                    </p>
                    <p style={aboutStyles.cardText}>
                        <strong>Спасение и Церковь:</strong> Иисус Христос совершил заместительную жертву за грехи людей. Каждый, кто раскаивается и верит в Него, обретает вечную жизнь. Все верующие составляют Вселенскую Церковь, призванную поклоняться Богу, совершать таинства (крещение и причастие) и нести Евангелие миру.
                    </p>
                    <p style={aboutStyles.cardText}>
                        <strong>Будущее и Свобода:</strong> Мы ожидаем видимого возвращения Иисуса Христа, телесного воскресения и вечной жизни с Богом. Также мы твердо стоим на принципах свободы совести и неприкосновенности личного выбора каждого человека в вопросах веры.
                    </p>
                </div>
            </div>

            {/* ================= НИЖНЕЕ МЕНЮ НАВИГАЦИИ ================= */}
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

const aboutStyles = {
    headerWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
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
    dropdownCard: {
        position: 'absolute',
        top: 'calc(100% + 4px)',
        right: '0',
        width: '260px',
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        zIndex: 1000,
    },
    dropdownTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    dropdownNavText: {
        padding: '14px 16px',
        fontSize: '13px',
        fontWeight: '700',
        color: '#70778A',
        letterSpacing: '0.5px',
        borderBottom: '1px solid #f0f3f6',
    },
    dropdownTableCell: {
        borderBottom: '1px solid #f0f3f6',
    },
    dropdownTableCellLast: {
        borderBottom: 'none',
    },
    dropdownLink: {
        display: 'block',
        padding: '14px 16px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#000000',
        textDecoration: 'none',
        transition: 'background 0.2s',
    },
    descriptionCard: {
        background: '#ffffff',
        border: '1.5px solid #d0d7de',
        borderRadius: '25px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '12px',
    },
    cardText: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333333',
    },
};