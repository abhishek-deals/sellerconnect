import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Check } from 'lucide-react';
import './Auth.css';

const plans = ['Starter – ₹499/mo', 'Growth – ₹999/mo', 'Pro – ₹1,999/mo'];

export default function Signup() {
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 2) setStep(2);
        else navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-brand">
                    <Link to="/" className="auth-logo">
                        <div className="logo-icon"><ShoppingBag size={20} color="#fff" /></div>
                        <span style={{ fontSize: '22px', fontWeight: 800 }}>
                            <span style={{ color: '#fff' }}>Seller</span><span className="gradient-text">Connect</span>
                        </span>
                    </Link>
                    <h1>Start Selling Online Today</h1>
                    <p>Join 120+ shopkeepers growing their business with SellerConnect. Your online store will be live in 7 days!</p>
                </div>
                <div className="signup-features">
                    {['No technical skills needed', 'Live in 7 days — guaranteed', '₹0 upfront to start free consultation', '24/7 WhatsApp support', 'Cancel anytime'].map((f, i) => (
                        <div key={i} className="signup-feature"><Check size={16} className="signup-check" /><span>{f}</span></div>
                    ))}
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-box card">
                    <div className="signup-progress">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}><span>1</span> Shop Info</div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}><span>2</span> Account Setup</div>
                    </div>

                    <h2>{step === 1 ? 'Tell Us About Your Shop' : 'Create Your Account'}</h2>

                    <form onSubmit={handleNext} className="auth-form">
                        {step === 1 ? (
                            <>
                                <div className="form-grid-2">
                                    <div className="form-group"><label>Your Name *</label><input required placeholder="Ramesh Kumar" /></div>
                                    <div className="form-group"><label>Shop Name *</label><input required placeholder="Ramesh Kirana" /></div>
                                </div>
                                <div className="form-grid-2">
                                    <div className="form-group"><label>City *</label><input required placeholder="Bhubaneswar" /></div>
                                    <div className="form-group"><label>Phone *</label><input required type="tel" placeholder="+91 98765 43210" /></div>
                                </div>
                                <div className="form-group">
                                    <label>What do you sell? *</label>
                                    <select required>
                                        <option value="">Select business type</option>
                                        <option>Grocery / Kirana</option><option>Clothing / Garments</option>
                                        <option>Electronics</option><option>Medical / Pharmacy</option>
                                        <option>Sweets / Bakery</option><option>Other</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group"><label>Email Address *</label><input required type="email" placeholder="you@example.com" /></div>
                                <div className="form-group">
                                    <label>Create Password *</label>
                                    <div className="input-with-icon">
                                        <input required type={show ? 'text' : 'password'} placeholder="Min. 8 characters" />
                                        <button type="button" className="icon-toggle" onClick={() => setShow(!show)}>
                                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Choose Plan</label>
                                    <select>
                                        {plans.map((p, i) => <option key={i}>{p}</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            {step === 1 ? 'Continue →' : '🚀 Create My Store Free'}
                        </button>
                    </form>

                    {step === 1 && (
                        <>
                            <div className="auth-divider"><span>or</span></div>
                            <button className="btn btn-outline google-btn" style={{ width: '100%', justifyContent: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2a10 10 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" fill="#4285F4" /><path d="M9 18a8.59 8.59 0 0 0 5.96-2.18l-2.92-2.26a5.43 5.43 0 0 1-8.07-2.85H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853" /><path d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33z" fill="#FBBC05" /><path d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .96 4.96L3.96 7.3A5.36 5.36 0 0 1 9 3.58z" fill="#EA4335" /></svg>
                                Sign up with Google
                            </button>
                        </>
                    )}

                    <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}
