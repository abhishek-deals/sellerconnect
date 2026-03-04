import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, DollarSign, LogOut, Truck, Settings } from 'lucide-react';
import '../admin/Admin.css';

const navItems = [
    { to: '/rider', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/rider/orders', label: 'My Orders', icon: <ShoppingCart size={18} /> },
    { to: '/rider/earnings', label: 'Earnings', icon: <DollarSign size={18} /> },
    { to: '/rider/settings', label: 'Settings', icon: <Settings size={18} /> },
];

export default function RiderLayout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isActive = (to) => to === '/rider' ? pathname === '/rider' : pathname.startsWith(to);

    return (
        <div className="rider-layout">
            <aside className="rider-sidebar">
                <div className="rider-sidebar-header">
                    <div className="rider-logo-icon">
                        <Truck size={16} color="#fff" />
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>
                            Seller<span style={{ color: '#6ee7b7' }}>Connect</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>RIDER PORTAL</div>
                    </div>
                </div>

                <nav className="rider-nav">
                    {navItems.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`rider-nav-link ${isActive(item.to) ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button className="admin-logout-btn" onClick={() => navigate('/')}>
                        <LogOut size={15} /> Logout
                    </button>
                </div>
            </aside>

            <div className="rider-main">
                <header className="rider-header">
                    <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>
                        {navItems.find(i => isActive(i.to))?.label || 'Rider Dashboard'}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="rider-status-badge online">🟢 Online</span>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>A</div>
                    </div>
                </header>

                <main className="rider-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
