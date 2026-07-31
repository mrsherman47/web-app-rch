import React from 'react';
import { translations } from '../translations';

export default function Home({ lang, events, onNavigate }) {
    const t = translations[lang];
    const [openAccordion, setOpenAccordion] = React.useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* ГЛАВНЫЙ БАННЕР */}
            <div className="hero-banner" style={{ background: '#2481cc', color: 'white', padding: '24px', borderRadius: '12px' }}>
                <span style={{ fontSize: '11px', opacity: 0.8 }}>rec.church.minsk</span>
                <h2 style={{ margin: '8px 0' }}>{t.subtitle}</h2>
                <p style={{ fontSize: '13px', lineHeight: '1.4' }}>{t.desc}</p>
                <button style={{ background: '#fff', color: '#000', border: 'none', width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                    {t.watchBtn}
                </button>
            </div>

            {/* РАСПИСАНИЕ МЕСЯЦА (динамические блоки) */}
            <div className="card" style={{ background: '#fff', padding: '20px', borderRadius: '12px' }}>
                <h3>{t.scheduleTitle}</h3>
                {events.map((item) => (
                    <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.title}</div>
                        <div style={{ color: '#70778a', fontSize: '13px', marginTop: '2px' }}>{item.date} | {item.time}</div>
                    </div>
                ))}
                <button 
                    onClick={() => onNavigate('events')} 
                    style={{ background: '#2481cc', color: '#fff', border: 'none', width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' }}
                >
                    {t.allScheduleBtn}
                </button>
            </div>

            {/* ПЕРВЫЙ ВИЗИТ (Гармошка) */}
            <div className="card" style={{ background: '#fff', padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#2481cc' }}>{t.firstVisitTitle}</span>
                <h3 style={{ margin: '6px 0 10px', fontSize: '16px' }}>{t.firstVisitSub}</h3>
                
                {['Служение', 'Добраться', 'Друзья'].map((item, idx) => (
                    <div key={idx} style={{ border: '1px solid #eee', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
                        <div 
                            onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                            style={{ padding: '12px 16px', background: '#fafafa', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
                        >
                            <span>{item}</span>
                            <span>{openAccordion === idx ? '−' : '+'}</span>
                        </div>
                        {openAccordion === idx && (
                            <div style={{ padding: '12px 16px', fontSize: '13px', color: '#70778a', borderTop: '1px solid #eee' }}>
                                Подробная информация для раздела "{item}".
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* О НАШЕЙ ЦЕРКВИ */}
            <div className="card" style={{ background: '#fff', padding: '20px', borderRadius: '12px' }}>
                <h3>{t.aboutTitle}</h3>
                <p style={{ fontSize: '13px', color: '#70778a' }}>{t.aboutDesc}</p>
                <button 
                    onClick={() => onNavigate('about')} 
                    style={{ background: '#2481cc', color: '#fff', border: 'none', width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
                >
                    {t.detailsBtn}
                </button>
            </div>

        </div>
    );
}
