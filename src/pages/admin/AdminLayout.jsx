import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, ShoppingCart, Truck, DollarSign,
    Settings, LogOut, ShoppingBag, Shield, Eye, EyeOff, CreditCard
} from 'lucide-react';
import './Admin.css';

// The admin security key
const ADMIN_KEY = 'sellerconnect12345';

const navItems = [
    { to: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/admin/sellers', label: 'Sellers', icon: <Users size={18} /> },
    { to: '/admin/riders', label: 'Riders', icon: <Truck size={18} /> },
    { to: '/admin/orders', label: 'All Orders', icon: <ShoppingCart size={18} /> },
    { to: '/admin/revenue', label: 'Revenue', icon: <DollarSign size={18} /> },
    { to: '/admin/payouts', label: 'Payouts', icon: <CreditCard size={18} /> },
    { to: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
];

function SecurityGate({ onUnlock }) {
    const [key, setKey] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (key === ADMIN_KEY) {
            sessionStorage.setItem('adminUnlocked', 'true');
            onUnlock();
        } else {
            setError('Invalid security key. Access denied.');
            setKey('');
        }
    };

    return (
        <div className="admin-security-page">
            <div className="admin-security-card">
                <div className="admin-security-icon">
                    <Shield size={28} color="#fff" />
                </div>
                <h2>Admin Access</h2>
                <p>Enter the platform security key to access the Super Admin dashboard.</p>
                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={show ? 'text' : 'password'}
                            className="admin-key-input"
                            placeholder="Enter security key"
                            value={key}
                            onChange={e => { setKey(e.target.value); setError(''); }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                        >
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {error && <p className="admin-key-error">{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                        Unlock Admin Panel →
                    </button>
                </form>
                <Link to="/" style={{ display: 'block', marginTop: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none' }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}

export default function AdminLayout() {
    const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('adminUnlocked') === 'true');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isActive = (to) => to === '/admin' ? pathname === '/admin' : pathname.startsWith(to);

    const handleLogout = () => {
        sessionStorage.removeItem('adminUnlocked');
        navigate('/');
    };

    if (!unlocked) return <SecurityGate onUnlock={() => setUnlocked(true)} />;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="admin-logo-icon">
                        <ShoppingBag size={16} color="#fff" />
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>
                            Seller<span style={{ color: '#a5b4fc' }}>Connect</span>
                        </div>
                        <span className="admin-sidebar-badge">Super Admin</span>
                    </div>
                </div>

                <nav className="admin-nav">
                    {navItems.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`admin-nav-link ${isActive(item.to) ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <LogOut size={15} /> Logout
                    </button>
                </div>
            </aside>

            <div className="admin-main">
                <header className="admin-header">
                    <div className="admin-header-left">
                        <h1>
                            {navItems.find(i => isActive(i.to))?.label || 'Admin Panel'}
                        </h1>
                    </div>
                    <div className="admin-header-right">
                        <span style={{ fontSize: 13, color: '#6b7280' }}>Super Admin</span>
                        <div className="admin-avatar">A</div>
                    </div>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
