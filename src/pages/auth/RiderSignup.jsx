import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Check } from 'lucide-react';
import './Auth.css';

export default function RiderSignup() {
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 2) setStep(2);
        else navigate('/rider');
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
                    <h1>Become a Rider 🚴</h1>
                    <p>Join our delivery network and start earning. Flexible hours, daily payouts, and full support.</p>
                </div>
                <div className="signup-features">
                    {[
                        'Earn ₹500–₹1,500 per day',
                        'Flexible working hours',
                        'Daily earnings payout',
                        'Free insurance coverage',
                        'Dedicated rider app',
                    ].map((f, i) => (
                        <div key={i} className="signup-feature"><Check size={16} className="signup-check" /><span>{f}</span></div>
                    ))}
                </div>
            </div>

            {/* RIGHT */}
            <div className="auth-right">
                <div className="auth-box card">
                    <div className="signup-progress">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}><span>1</span> Personal Info</div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}><span>2</span> Vehicle & ID</div>
                    </div>

                    <h2>{step === 1 ? 'Personal Details' : 'Vehicle & Documents'}</h2>

                    <form onSubmit={handleNext} className="auth-form">
                        {step === 1 ? (
                            <>
                                <div className="form-grid-2">
                                    <div className="form-group"><label>Full Name *</label><input required placeholder="Suresh Yadav" /></div>
                                    <div className="form-group"><label>Phone *</label><input required type="tel" placeholder="+91 98765 43210" /></div>
                                </div>
                                <div className="form-grid-2">
                                    <div className="form-group"><label>City *</label><input required placeholder="Bhubaneswar" /></div>
                                    <div className="form-group"><label>Date of Birth *</label><input required type="date" /></div>
                                </div>
                                <div className="form-group"><label>Email Address *</label><input required type="email" placeholder="you@example.com" /></div>
                            </>
                        ) : (
                            <>
                                <div className="form-grid-2">
                                    <div className="form-group">
                                        <label>Vehicle Type *</label>
                                        <select required>
                                            <option value="">Select vehicle</option>
                                            <option>Bicycle</option>
                                            <option>Motorcycle</option>
                                            <option>Scooter</option>
                                            <option>Electric Bike</option>
                                        </select>
                                    </div>
                                    <div className="form-group"><label>Vehicle Number *</label><input required placeholder="OD 05 AB 1234" /></div>
                                </div>
                                <div className="form-group"><label>Aadhaar / PAN Number *</label><input required placeholder="XXXXXXXXX" /></div>
                                <div className="form-group"><label>Driving Licence Number *</label><input required placeholder="DL-XXXXXXXX" /></div>
                                <div className="form-group">
                                    <label>Create Password *</label>
                                    <div className="input-with-icon">
                                        <input required type={show ? 'text' : 'password'} placeholder="Min. 8 characters" />
                                        <button type="button" className="icon-toggle" onClick={() => setShow(!show)}>
                                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            {step === 1 ? 'Continue →' : '🚴 Join as Rider'}
                        </button>
                    </form>

                    <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}
