import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Smartphone, Bike, ShieldCheck } from 'lucide-react';
import './Auth.css';

const ROLES = [
    { key: 'seller', label: 'Seller', icon: '🛍️', dest: '/dashboard', signup: '/signup', signupLabel: 'Sign Up as Seller' },
    { key: 'rider', label: 'Rider', icon: '🚴', dest: '/rider', signup: '/rider-signup', signupLabel: 'Sign Up as Rider' },
    { key: 'admin', label: 'Admin', icon: '🛡️', dest: '/admin', signup: '/admin-signup', signupLabel: 'Request Admin Access' },
];

const LEFT_CONTENT = {
    seller: {
        heading: 'Welcome back, Seller!',
        sub: 'Log in to manage your online store, orders, and customers.',
        stats: [
            { emoji: '📦', strong: '24 New Orders', span: 'Pending action' },
            { emoji: '💰', strong: '₹12,450', span: "Today's revenue" },
            { emoji: '⭐', strong: '4.9 Rating', span: 'From customers' },
        ],
    },
    rider: {
        heading: 'Welcome back, Rider!',
        sub: 'Log in to view your deliveries, earnings, and route updates.',
        stats: [
            { emoji: '🗺️', strong: '8 Active Routes', span: 'Ready to pick up' },
            { emoji: '💸', strong: '₹3,200', span: "This week's earnings" },
            { emoji: '⚡', strong: '98% On-time', span: 'Delivery rate' },
        ],
    },
    admin: {
        heading: 'Admin Control Panel',
        sub: 'Secure access for platform administrators only.',
        stats: [
            { emoji: '👥', strong: '1,240 Sellers', span: 'On the platform' },
            { emoji: '🚴', strong: '340 Riders', span: 'Active today' },
            { emoji: '📊', strong: '₹8.2L Revenue', span: 'This month' },
        ],
    },
};

const DEMO_CREDS = {
    seller: { email: 'seller@sellconnect.in', password: 'Seller@123' },
    rider: { email: 'rider@sellconnect.in', password: 'Rider@123' },
    admin: { email: 'admin@sellconnect.in', password: 'Admin@123' },
};

export default function Login() {
    const [show, setShow] = useState(false);
    const [tab, setTab] = useState('password');
    const [role, setRole] = useState('seller');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const activeRole = ROLES.find(r => r.key === role);
    const leftContent = LEFT_CONTENT[role];

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        if (tab === 'otp') {
            // OTP path – skip credential check
            navigate(activeRole.dest);
            return;
        }
        const creds = DEMO_CREDS[role];
        if (email === creds.email && password === creds.password) {
            navigate(activeRole.dest);
        } else {
            setError(`Invalid credentials. Use demo: ${creds.email} / ${creds.password}`);
        }
    };

    const handleRoleChange = (key) => {
        setRole(key);
        setTab('password');
        setShow(false);
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="auth-page">
            {/* ── LEFT PANEL ── */}
            <div className="auth-left">
                <div className="auth-brand">
                    <Link to="/" className="auth-logo">
                        <div className="logo-icon"><ShoppingBag size={20} color="#fff" /></div>
                        <span style={{ fontSize: '22px', fontWeight: 800 }}>
                            <span style={{ color: '#fff' }}>Seller</span><span className="gradient-text">Connect</span>
                        </span>
                    </Link>
                    <h1>{leftContent.heading}</h1>
                    <p>{leftContent.sub}</p>
                </div>
                <div className="auth-illustration">
                    {leftContent.stats.map((s, i) => (
                        <div key={i} className="auth-stat-card">
                            <span className="stat-emoji">{s.emoji}</span>
                            <div><strong>{s.strong}</strong><span>{s.span}</span></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="auth-right">
                <div className="auth-box card">
                    <h2>Sign In</h2>
                    <p className="auth-sub">Choose your role to continue</p>

                    {/* Role Selector */}
                    <div className="role-selector">
                        {ROLES.map(r => (
                            <button
                                key={r.key}
                                className={`role-btn${role === r.key ? ' active' : ''}`}
                                onClick={() => handleRoleChange(r.key)}
                                type="button"
                            >
                                <span className="role-icon">{r.icon}</span>
                                <span>{r.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Login-method tabs — hidden for admin (credential only) */}
                    {role !== 'admin' && (
                        <div className="auth-tabs">
                            <button className={tab === 'password' ? 'active' : ''} onClick={() => setTab('password')}>Password Login</button>
                            <button className={tab === 'otp' ? 'active' : ''} onClick={() => setTab('otp')}>OTP Login</button>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="auth-form">
                        {error && (
                            <div className="auth-error">{error}</div>
                        )}
                        <div className="form-group">
                            <label>{tab === 'otp' ? 'Phone Number' : 'Email or Phone'}</label>
                            <input
                                required
                                type={tab === 'otp' ? 'tel' : 'email'}
                                placeholder={tab === 'otp' ? '+91 98765 43210' : DEMO_CREDS[role].email}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        {tab === 'otp' && role !== 'admin' ? (
                            <button type="button" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                                <Smartphone size={16} /> Send OTP
                            </button>
                        ) : (
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <input
                                        required
                                        type={show ? 'text' : 'password'}
                                        placeholder={DEMO_CREDS[role].password}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <button type="button" className="icon-toggle" onClick={() => setShow(!show)}>
                                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            {role === 'admin' ? '🛡️ Admin Sign In' : 'Sign In →'}
                        </button>
                    </form>

                    {/* Google sign-in only for seller & rider */}
                    {role !== 'admin' && (
                        <>
                            <div className="auth-divider"><span>or continue with</span></div>
                            <button className="btn btn-outline google-btn" style={{ width: '100%', justifyContent: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2a10 10 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" fill="#4285F4" /><path d="M9 18a8.59 8.59 0 0 0 5.96-2.18l-2.92-2.26a5.43 5.43 0 0 1-8.07-2.85H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853" /><path d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33z" fill="#FBBC05" /><path d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .96 4.96L3.96 7.3A5.36 5.36 0 0 1 9 3.58z" fill="#EA4335" /></svg>
                                Continue with Google
                            </button>
                        </>
                    )}

                    {/* Demo credentials hint */}
                    <div className="demo-hint">
                        <span className="demo-hint-label">🔑 Demo Login</span>
                        <code>{DEMO_CREDS[role].email}</code>
                        <code>{DEMO_CREDS[role].password}</code>
                    </div>

                    <p className="auth-switch">
                        {role === 'admin'
                            ? <>Need access? <Link to={activeRole.signup}>Request Admin Access</Link></>
                            : <>Don't have an account? <Link to={activeRole.signup}>{activeRole.signupLabel}</Link></>
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
