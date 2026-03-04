import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Contact.css';

const faqs = [
    { q: 'How long does it take to set up my online store?', a: 'We guarantee your store will be live within 7 working days of registration and onboarding. Most stores go live in 3-5 days.' },
    { q: 'Do I need any technical knowledge?', a: 'Absolutely not! Our team handles everything — website setup, product uploads, payment integration, and Google Business setup. You just need to share your products and branding details.' },
    { q: 'What is the refund policy?', a: 'If your store is not live within 7 days, you get a full refund. We also offer a 30-day money-back guarantee if you are not satisfied with the results.' },
    { q: 'Can I manage my own products after setup?', a: 'Yes! After setup, you get a simple dashboard to add, edit, and manage products, orders, and customers on your own.' },
    { q: 'Is my shop data safe?', a: 'Yes, all data is stored securely with SSL encryption, regular backups, and GDPR-compliant handling. Your shop and customer data is 100% yours.' },
    { q: 'Do you provide after-setup support?', a: 'Yes, all plans include ongoing WhatsApp support. Growth and Pro plans include dedicated account manager support.' },
];

export default function Contact() {
    const [openFaq, setOpenFaq] = useState(null);
    const [form, setForm] = useState({ name: '', shop: '', city: '', phone: '', sell: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div>
            <Navbar />
            <div className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="container">
                    <span className="eyebrow-light">Contact Us</span>
                    <h1>Let's Talk About <span className="gradient-text">Your Shop</span></h1>
                    <p>Fill the form below and our team will call you within 24 hours to discuss how we can help your business grow online.</p>
                </div>
            </div>

            <section className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* FORM */}
                        <div className="contact-form-wrap card">
                            <h2>Book a Free Consultation</h2>
                            <p style={{ color: 'var(--gray-500)', marginBottom: '24px', fontSize: '14px' }}>Our expert will call you within 24 hours — free, no obligation.</p>
                            {sent ? (
                                <div className="form-success">
                                    <div className="success-icon">🎉</div>
                                    <h3>Thank You!</h3>
                                    <p>We've received your request. Our team will call you within 24 hours on the number provided.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-grid-2">
                                        <div className="form-group">
                                            <label>Your Name *</label>
                                            <input required placeholder="Ramesh Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Shop Name *</label>
                                            <input required placeholder="Ramesh Kirana Store" value={form.shop} onChange={e => setForm({ ...form, shop: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-grid-2">
                                        <div className="form-group">
                                            <label>City *</label>
                                            <input required placeholder="Bhubaneswar" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number *</label>
                                            <input required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>What do you sell? *</label>
                                        <select required value={form.sell} onChange={e => setForm({ ...form, sell: e.target.value })}>
                                            <option value="">Select your business type</option>
                                            <option>Grocery / Kirana</option>
                                            <option>Clothing / Garments</option>
                                            <option>Electronics</option>
                                            <option>Medical / Pharmacy</option>
                                            <option>Sweets / Bakery</option>
                                            <option>Stationery / Books</option>
                                            <option>Food / Restaurant</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                                        📞 Request Free Call Back
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* CONTACT INFO */}
                        <div className="contact-info">
                            <div className="contact-info-card card">
                                <div className="contact-info-item">
                                    <div className="icon-box icon-box-blue"><Mail size={20} /></div>
                                    <div>
                                        <div className="contact-label">Email Us</div>
                                        <a href="mailto:support@sellerconnect.in" style={{ color: 'var(--accent-mid)', fontWeight: '600' }}>support@sellerconnect.in</a>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="icon-box icon-box-green"><Phone size={20} /></div>
                                    <div>
                                        <div className="contact-label">Call Us</div>
                                        <a href="tel:+919876543210" style={{ color: 'var(--accent-mid)', fontWeight: '600' }}>+91 98765 43210</a>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="icon-box icon-box-purple"><MapPin size={20} /></div>
                                    <div>
                                        <div className="contact-label">Office</div>
                                        <span style={{ fontWeight: '600' }}>Bhubaneswar, Odisha, India 751001</span>
                                    </div>
                                </div>
                                <div className="contact-direct-btns">
                                    <a href="https://wa.me/919876543210" className="btn btn-primary" style={{ background: '#25d366', width: '100%', justifyContent: 'center' }}>
                                        <MessageCircle size={16} /> Chat on WhatsApp
                                    </a>
                                    <a href="tel:+919876543210" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                                        <Phone size={16} /> Call Now
                                    </a>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="faq-section">
                                <h3 style={{ marginBottom: '16px' }}>Frequently Asked Questions</h3>
                                {faqs.map((faq, i) => (
                                    <div key={i} className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}>
                                        <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                            <span>{faq.q}</span>
                                            {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                        {openFaq === i && <div className="faq-a">{faq.a}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
