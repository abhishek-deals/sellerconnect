import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Twitter, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="logo-icon"><ShoppingBag size={18} color="#fff" /></div>
                            <span><span style={{ color: '#fff' }}>Seller</span><span className="gradient-text">Connect</span></span>
                        </div>
                        <p className="footer-tagline">Connecting Local Sellers to the Online World — empowering shopkeepers to sell online easily.</p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h4>Platform</h4>
                        <Link to="/services">Services</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4>Quick Links</h4>
                        <Link to="/signup">Start Free</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <a href="#">Referral Program</a>
                    </div>

                    <div className="footer-links-group">
                        <h4>Contact</h4>
                        <div className="footer-contact-item"><Mail size={15} /><span>support@sellerconnect.in</span></div>
                        <div className="footer-contact-item"><Phone size={15} /><span>+91 98765 43210</span></div>
                        <div className="footer-contact-item"><MapPin size={15} /><span>Bhubaneswar, Odisha</span></div>
                        <a href="https://wa.me/919876543210" className="btn btn-sm" style={{ background: '#25d366', color: '#fff', marginTop: '8px' }}>
                            <MessageCircle size={15} /> WhatsApp Us
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 SellerConnect. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
