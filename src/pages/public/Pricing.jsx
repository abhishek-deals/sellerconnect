import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Zap, Star, Shield, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Pricing.css';

const plans = [
    {
        name: 'Starter', emoji: '🌱', price: '1,499', period: '/month',
        setup: '₹2,999 one-time setup',
        desc: 'Perfect for shops just starting their online journey.',
        color: 'blue', popular: false,
        features: [
            { text: '20 Products', yes: true },
            { text: 'WhatsApp Ordering System', yes: true },
            { text: 'Basic Website', yes: true },
            { text: 'Google Business Profile', yes: true },
            { text: 'Mobile-Responsive Store', yes: true },
            { text: 'Payment Gateway', yes: false },
            { text: 'Ads Campaign Setup', yes: false },
            { text: 'Order Tracking', yes: false },
            { text: 'Analytics Dashboard', yes: false },
            { text: 'AI Tools', yes: false },
            { text: 'Dedicated Manager', yes: false },
        ],
    },
    {
        name: 'Growth', emoji: '🚀', price: '3,499', period: '/month',
        setup: '₹5,999 one-time setup',
        desc: 'Best for shops ready to grow with ads and payments.',
        color: 'purple', popular: true,
        features: [
            { text: '200 Products', yes: true },
            { text: 'WhatsApp Ordering System', yes: true },
            { text: 'Professional Website', yes: true },
            { text: 'Google Business Profile', yes: true },
            { text: 'Mobile-Responsive Store', yes: true },
            { text: 'Payment Gateway (Razorpay)', yes: true },
            { text: 'Ads Campaign Setup', yes: true },
            { text: 'Order Tracking System', yes: true },
            { text: 'Basic Analytics', yes: true },
            { text: 'AI Tools', yes: false },
            { text: 'Dedicated Manager', yes: false },
        ],
    },
    {
        name: 'Pro', emoji: '👑', price: '6,999', period: '/month',
        setup: '₹9,999 one-time setup',
        desc: 'For serious sellers who want full automation and growth.',
        color: 'orange', popular: false,
        features: [
            { text: 'Unlimited Products', yes: true },
            { text: 'WhatsApp Ordering System', yes: true },
            { text: 'Premium Website + Custom Design', yes: true },
            { text: 'Google Business Profile', yes: true },
            { text: 'Mobile-Responsive Store', yes: true },
            { text: 'Payment Gateway (Razorpay)', yes: true },
            { text: 'Full Ads Campaign Management', yes: true },
            { text: 'Advanced Order Tracking', yes: true },
            { text: 'Advanced Analytics Dashboard', yes: true },
            { text: 'All AI Tools Included', yes: true },
            { text: 'Dedicated Account Manager', yes: true },
        ],
    },
];

const tableFeatures = [
    'Products Listed', 'WhatsApp Orders', 'Website', 'Payment Gateway',
    'Ads Setup', 'Order Tracking', 'Analytics', 'AI Tools', 'Dedicated Manager',
];

export default function Pricing() {
    const [annual, setAnnual] = useState(false);
    return (
        <div>
            <Navbar />
            <div className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="container">
                    <span className="eyebrow-light">Pricing</span>
                    <h1>Simple, Transparent <span className="gradient-text">Pricing</span></h1>
                    <p>No hidden fees. Cancel anytime. Your shop online in 7 days — guaranteed.</p>
                    <div className="billing-toggle">
                        <span className={!annual ? 'active' : ''}>Monthly</span>
                        <button className={`toggle-btn ${annual ? 'on' : ''}`} onClick={() => setAnnual(!annual)}>
                            <div className="toggle-thumb"></div>
                        </button>
                        <span className={annual ? 'active' : ''}>Annual <span className="badge badge-green" style={{ padding: '2px 8px', fontSize: '11px' }}>Save 20%</span></span>
                    </div>
                </div>
            </div>

            <section className="section pricing-section">
                <div className="container">
                    <div className="pricing-grid">
                        {plans.map((plan, i) => (
                            <div key={i} className={`pricing-card card ${plan.popular ? 'pricing-card-popular' : ''}`}>
                                {plan.popular && <div className="popular-badge"><Star size={13} fill="#fff" /> Most Popular</div>}
                                <div className="plan-header">
                                    <span className="plan-emoji">{plan.emoji}</span>
                                    <h3 className="plan-name">{plan.name}</h3>
                                    <p className="plan-desc">{plan.desc}</p>
                                </div>
                                <div className="plan-price">
                                    <span className="price-currency">₹</span>
                                    <span className="price-amount">{annual ? Math.round(parseInt(plan.price.replace(',', '')) * 0.8).toLocaleString('en-IN') : plan.price}</span>
                                    <span className="price-period">{plan.period}</span>
                                </div>
                                <div className="plan-setup">{plan.setup}</div>
                                <Link to="/signup" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ justifyContent: 'center' }}>
                                    Get Started <ArrowRight size={16} />
                                </Link>
                                <ul className="plan-features">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className={f.yes ? '' : 'feature-no'}>
                                            {f.yes ? <Check size={15} className="f-yes" /> : <X size={15} className="f-no" />}
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Compare Table */}
                    <div className="compare-table-wrap">
                        <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Plan <span className="gradient-text">Comparison</span></h2>
                        <div className="compare-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>🌱 Starter</th>
                                        <th className="th-popular">🚀 Growth</th>
                                        <th>👑 Pro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Products', '20', '200', 'Unlimited'],
                                        ['WhatsApp Orders', '✅', '✅', '✅'],
                                        ['Website', 'Basic', 'Professional', 'Premium Custom'],
                                        ['Payment Gateway', '❌', '✅', '✅'],
                                        ['Ads Setup', '❌', '✅', '✅ Managed'],
                                        ['Order Tracking', '❌', '✅', '✅ Advanced'],
                                        ['Analytics', '❌', 'Basic', 'Advanced'],
                                        ['AI Tools', '❌', '❌', '✅ All'],
                                        ['Dedicated Manager', '❌', '❌', '✅'],
                                    ].map(([feat, s, g, p], i) => (
                                        <tr key={i}>
                                            <td>{feat}</td>
                                            <td>{s}</td>
                                            <td className="td-popular">{g}</td>
                                            <td>{p}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ / Guarantee */}
                    <div className="guarantee-box">
                        <Shield size={40} className="guarantee-icon" />
                        <div>
                            <h3>7-Day Setup Guarantee 🎯</h3>
                            <p>We promise to have your online store live within 7 working days of onboarding. If we fail, you get a full refund — no questions asked.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
