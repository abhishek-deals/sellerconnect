import { Link } from 'react-router-dom';
import { Target, Eye, Users, Zap, Heart, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './About.css';

const values = [
    { icon: <Heart />, title: 'Empathy First', desc: 'We understand the challenges of small shopkeepers because we grew up around them.' },
    { icon: <Zap />, title: 'Simplicity', desc: 'Complex technology, made simple enough for anyone to use without technical training.' },
    { icon: <Target />, title: 'Results Driven', desc: 'We measure success by your sales growth, not just by the website we build.' },
    { icon: <Users />, title: 'Community', desc: 'Every shop we onboard strengthens the local economy and empowers entrepreneurs.' },
];

const timeline = [
    { year: '2023', title: 'The Idea', desc: "Founder Aryan Mishra saw his father's grocery store struggle with online competition and decided to act." },
    { year: '2024 Q1', title: 'First Pilot', desc: '5 shops onboarded in Bhubaneswar. Within 60 days, average revenue increased by 40%.' },
    { year: '2024 Q3', title: 'Product Launch', desc: 'SellerConnect officially launched with a dashboard, AI tools, and WhatsApp ordering.' },
    { year: '2025', title: 'Scaling Up', desc: '120+ shops across Odisha. Expanding to Tamil Nadu, Maharashtra, and West Bengal.' },
];

export default function About() {
    return (
        <div>
            <Navbar />

            <div className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="container">
                    <span className="eyebrow-light">About Us</span>
                    <h1>Built by Shopkeepers' Kids, <span className="gradient-text">For Shopkeepers</span></h1>
                    <p>We started SellerConnect because we saw brilliant local businesses struggling to compete in the digital age — and we knew we could help.</p>
                </div>
            </div>

            {/* Story */}
            <section className="section">
                <div className="container about-story">
                    <div className="story-text">
                        <h2>Our Story</h2>
                        <p>SellerConnect was born out of frustration. Our founder, Aryan Mishra, watched his father's 20-year-old grocery store in Bhubaneswar slowly lose customers to online platforms and delivery apps. Despite having the best quality products and loyal customers, the shop was invisible on Google, had no way to accept online payments, and couldn't compete with Swiggy Instamart or JioMart.</p>
                        <p style={{ marginTop: '16px' }}>Instead of giving up, Aryan spent 6 months building a simple digital setup for the store. The results were transformative — online orders started flowing in, revenue grew by 60%, and suddenly the store was competing on equal footing.</p>
                        <p style={{ marginTop: '16px' }}>That's when the idea struck: <strong>why not do this for every small shopkeeper in India?</strong> SellerConnect was founded with a simple mission — to make digital transformation accessible, affordable, and stress-free for local businesses.</p>
                        <Link to="/contact" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
                            Work with Us <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="story-timeline">
                        {timeline.map((t, i) => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-year">{t.year}</div>
                                <div className="timeline-content">
                                    <h4>{t.title}</h4>
                                    <p>{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section mv-section">
                <div className="container">
                    <div className="mv-grid">
                        <div className="mv-card">
                            <div className="icon-box icon-box-gradient"><Target size={24} color="#fff" /></div>
                            <h3>Our Mission</h3>
                            <p>To digitally empower every local shopkeeper in India — giving them the tools, support, and technology to compete in the modern marketplace without any technical burden.</p>
                        </div>
                        <div className="mv-card">
                            <div className="icon-box icon-box-gradient"><Eye size={24} color="#fff" /></div>
                            <h3>Our Vision</h3>
                            <p>A future where every kirana store, clothing shop, and local vendor in India operates a thriving online business — where your shop's reach is not limited by your lane, but extends across your entire city.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="eyebrow">Our Values</div>
                        <h2>What We <span className="gradient-text">Stand For</span></h2>
                    </div>
                    <div className="grid grid-4">
                        {values.map((v, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center', gap: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="icon-box icon-box-purple">{v.icon}</div>
                                <h3 style={{ fontSize: '17px' }}>{v.title}</h3>
                                <p style={{ color: 'var(--gray-500)', fontSize: '14px', lineHeight: '1.7' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
