import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [pathname]);

    const links = [
        { to: '/', label: 'Home' },
        { to: '/services', label: 'Services' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon"><ShoppingBag size={20} color="#fff" /></div>
                    <span><span className="logo-sell">Seller</span><span className="logo-sathi">Connect</span></span>
                </Link>

                <nav className="navbar-links">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className={`nav-link ${pathname === l.to ? 'nav-link-active' : ''}`}>{l.label}</Link>
                    ))}
                </nav>

                <div className="navbar-cta">
                    <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                    <Link to="/signup" className="btn btn-primary btn-sm">Get Started Free</Link>
                </div>

                <button className="navbar-toggle" onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="mobile-menu">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className={`mobile-link ${pathname === l.to ? 'mobile-link-active' : ''}`}>{l.label}</Link>
                    ))}
                    <div className="mobile-cta">
                        <Link to="/login" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Login</Link>
                        <Link to="/signup" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started Free</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
