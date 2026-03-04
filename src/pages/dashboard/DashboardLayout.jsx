import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, ShoppingCart, Users, BarChart3, CreditCard,
    Tag, Megaphone, Bot, Truck, Settings, LogOut, ShoppingBag, Menu, X,
    Bell, Search, ChevronRight, Store
} from 'lucide-react';
import './DashboardLayout.css';

const navItems = [
    { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/dashboard/products', label: 'Products', icon: <Package size={18} /> },
    { to: '/dashboard/orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
    { to: '/dashboard/customers', label: 'Customers', icon: <Users size={18} /> },
    { to: '/dashboard/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { to: '/dashboard/payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { to: '/dashboard/coupons', label: 'Coupons', icon: <Tag size={18} /> },
    { to: '/dashboard/marketing', label: 'Marketing', icon: <Megaphone size={18} /> },
    { to: '/dashboard/ai-tools', label: 'AI Tools', icon: <Bot size={18} />, badge: 'AI' },
    { to: '/dashboard/delivery', label: 'Delivery', icon: <Truck size={18} /> },
    { to: '/dashboard/store-customize', label: 'Store Design', icon: <Store size={18} /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <Settings size={18} /> },
];

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isActive = (to) => to === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(to);

    return (
        <div className="db-layout">
            {/* Sidebar */}
            <aside className={`db-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <div className="logo-icon"><ShoppingBag size={16} color="#fff" /></div>
                        <span><span style={{ color: '#fff' }}>Seller</span><span className="gradient-text">Connect</span></span>
                    </Link>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
                </div>

                <div className="sidebar-shop-info">
                    <div className="shop-avatar">🛒</div>
                    <div>
                        <div className="shop-name">Ramesh Kirana</div>
                        <div className="shop-plan"><span className="badge badge-purple" style={{ padding: '2px 8px', fontSize: '11px' }}>Growth Plan</span></div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`sidebar-link ${isActive(item.to) ? 'sidebar-link-active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="link-icon">{item.icon}</span>
                            <span className="link-label">{item.label}</span>
                            {item.badge && <span className="link-badge">{item.badge}</span>}
                            {isActive(item.to) && <ChevronRight size={14} className="link-arrow" />}
                        </Link>
                    ))}
                </nav>

                <button className="sidebar-logout" onClick={() => navigate('/login')}>
                    <LogOut size={16} /> Logout
                </button>
            </aside>

            {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}

            {/* Main Content */}
            <div className="db-main">
                <header className="db-header">
                    <button className="header-menu-btn" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
                    <div className="header-search">
                        <Search size={16} />
                        <input placeholder="Search products, orders..." />
                    </div>
                    <div className="header-actions">
                        <button className="header-icon-btn"><Bell size={18} /><span className="notif-dot"></span></button>
                        <div className="header-user">R</div>
                    </div>
                </header>

                <main className="db-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
