import React from 'react';
import logoIcon from '/media/black-logo.png'; 

export default function Home({ onNavigate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Блок шапки */}
            <div style={styles.headerContainer}>
                <div style={styles.leftSide}>
                    <img src={logoIcon} alt="REC CHURCH" style={styles.logoImg} />
                    <div style={styles.titleBlock}>
                        <span style={styles.mainTitle}>ПРИМИРЕНИЕ</span>
                        <span style={styles.subTitle}>ЦЕРКОВЬ</span>
                    </div>
                </div>

                <button onClick={() => alert('Меню нажато!')} style={styles.menuButton} aria-label="Меню">
                    <div style={styles.bar}></div>
                    <div style={styles.bar}></div>
                    <div style={styles.bar}></div>
                </button>
            </div>

            {/* Блок таблицы навигации */}
            <div style={{ background: '#fff', padding: '20px', borderRadius: '20px', border: '1.5px solid #d0d7de' }}>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>ПРИМИРЕНИЕ ЦЕРКОВЬ</h2>
                <p style={{ color: '#70778a', fontSize: '14px' }}>Навигация:</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} style={styles.link}>
                                    О церкви
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <a href="#events" onClick={(e) => { e.preventDefault(); onNavigate('events'); }} style={styles.link}>
                                    События
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <a href="#communication" onClick={(e) => { e.preventDefault(); onNavigate('communication'); }} style={styles.link}>
                                    Общение
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <a href="#ministries" onClick={(e) => { e.preventDefault(); onNavigate('ministries'); }} style={styles.link}>
                                    Наши служения
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <a href="#team" onClick={(e) => { e.preventDefault(); onNavigate('team'); }} style={styles.link}>
                                    Команда
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px 0' }}>
                                <a href="#baptism" onClick={(e) => { e.preventDefault(); onNavigate('baptism'); }} style={styles.link}>
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

// Стили
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
        fontWeight: '900',
        fontSize: '15px',
        letterSpacing: '0.5px',
        color: '#000000',
    },
    subTitle: {
        fontWeight: '700',
        fontSize: '13px',
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
        width: '24px',
        height: '3px',
        backgroundColor: '#2481cc',
        borderRadius: '2px',
    },
    link: {
        color: '#2481cc',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '15px',
        display: 'block',
    }
};