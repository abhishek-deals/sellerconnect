import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck } from 'lucide-react';
import './Auth.css';

export default function AdminSignup() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="auth-page">
            {/* LEFT */}
            <div className="auth-left">
                <div className="auth-brand">
                    <Link to="/" className="auth-logo">
                        <div className="logo-icon"><ShoppingBag size={20} color="#fff" /></div>
                        <span style={{ fontSize: '22px', fontWeight: 800 }}>
                            <span style={{ color: '#fff' }}>Seller</span><span className="gradient-text">Connect</span>
                        </span>
                    </Link>
                    <h1>Admin Access Request 🛡️</h1>
                    <p>Admin accounts are created by the platform team. Submit your request and we'll review it within 24 hours.</p>
                </div>
                <div className="auth-illustration">
                    <div className="auth-stat-card"><span className="stat-emoji">🔒</span><div><strong>Secure Access</strong><span>2FA enforced for all admins</span></div></div>
                    <div className="auth-stat-card"><span className="stat-emoji">✅</span><div><strong>Vetted Accounts</strong><span>Manual review by platform team</span></div></div>
                    <div className="auth-stat-card"><span className="stat-emoji">⏱️</span><div><strong>24h Review</strong><span>Fast approval process</span></div></div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="auth-right">
                <div className="auth-box card">
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📬</div>
                            <h2>Request Submitted!</h2>
                            <p className="auth-sub" style={{ marginBottom: '24px' }}>
                                Our team will review your request and contact you via email within <strong>24 hours</strong>.
                            </p>
                            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center' }}>
                                ← Back to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2>Request Admin Access</h2>
                            <p className="auth-sub">Fill in the details below. Our team reviews every request manually.</p>

                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="form-grid-2">
                                    <div className="form-group"><label>Full Name *</label><input required placeholder="Anita Sharma" /></div>
                                    <div className="form-group"><label>Designation *</label><input required placeholder="Operations Manager" /></div>
                                </div>
                                <div className="form-group"><label>Work Email *</label><input required type="email" placeholder="anita@company.com" /></div>
                                <div className="form-group"><label>Organization / Department *</label><input required placeholder="SellerConnect HQ" /></div>
                                <div className="form-group"><label>Phone Number *</label><input required type="tel" placeholder="+91 98765 43210" /></div>
                                <div className="form-group">
                                    <label>Reason for Access *</label>
                                    <select required>
                                        <option value="">Select reason</option>
                                        <option>Platform Operations</option>
                                        <option>Finance & Payouts</option>
                                        <option>Seller Support</option>
                                        <option>Rider Management</option>
                                        <option>Tech / Engineering</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    🛡️ Submit Access Request
                                </button>
                            </form>

                            <p className="auth-switch">Already have access? <Link to="/login">Sign In as Admin</Link></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
