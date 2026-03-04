import { useState } from 'react';
import { Truck, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../admin/Admin.css';

const steps = ['Personal Info', 'Documents', 'Vehicle', 'Banking', 'Review'];

export default function RiderRegistration() {
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: '', phone: '', email: '', city: '',
        aadhaar: '', license: '',
        vehicleType: '', vehicleNumber: '',
        bankAccount: '', bankIFSC: '', bankName: '', upiId: '',
    });

    const upd = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
    const I = ({ label, k, type = 'text', placeholder = '' }) => (
        <div className="form-group">
            <label>{label}</label>
            <input type={type} value={form[k]} onChange={e => upd(k, e.target.value)} placeholder={placeholder} />
        </div>
    );

    const STEP_CONTENT = [
        /* Step 0 — Personal Info */
        <div key={0} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-grid-2">
                <I label="Full Name *" k="fullName" placeholder="Ankit Verma" />
                <I label="Phone Number *" k="phone" type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="form-grid-2">
                <I label="Email Address *" k="email" type="email" placeholder="ankit@example.com" />
                <div className="form-group">
                    <label>City *</label>
                    <select value={form.city} onChange={e => upd('city', e.target.value)}>
                        <option value="">Select City</option>
                        {['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur'].map(c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>,
        /* Step 1 — Documents */
        <div key={1} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <I label="Aadhaar Number *" k="aadhaar" placeholder="XXXX XXXX XXXX" />
            <I label="Driving License Number *" k="license" placeholder="OD-1420110012345" />
            <div style={{ padding: '12px 16px', background: 'rgba(99,102,241,0.06)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.15)', fontSize: 13, color: '#4338ca' }}>
                🔒 Your documents are encrypted and only visible to our compliance team for verification.
            </div>
        </div>,
        /* Step 2 — Vehicle */
        <div key={2} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
                <label>Vehicle Type *</label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                    {['🚲 Bicycle', '🛵 Scooter', '🏍 Bike'].map(v => (
                        <button key={v} type="button"
                            onClick={() => upd('vehicleType', v)}
                            className={`radius-btn ${form.vehicleType === v ? 'active' : ''}`}
                            style={{ fontSize: 14 }}>
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            <I label="Vehicle Registration Number *" k="vehicleNumber" placeholder="OD 05 XX 1234" />
        </div>,
        /* Step 3 — Banking */
        <div key={3} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.06)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.15)', fontSize: 13, color: '#047857', fontWeight: 600 }}>
                💰 Earnings are settled weekly to your bank/UPI. No cash handling required.
            </div>
            <div className="form-grid-2">
                <I label="Bank Account Number *" k="bankAccount" placeholder="123456789012" />
                <I label="IFSC Code *" k="bankIFSC" placeholder="HDFC0001234" />
            </div>
            <I label="Bank Name *" k="bankName" placeholder="HDFC Bank" />
            <I label="UPI ID *" k="upiId" placeholder="ankit@upi" />
        </div>,
        /* Step 4 — Review */
        <div key={4} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
                ['Full Name', form.fullName], ['Phone', form.phone], ['Email', form.email], ['City', form.city],
                ['Vehicle', form.vehicleType], ['Vehicle No.', form.vehicleNumber],
                ['Bank', form.bankName], ['UPI', form.upiId],
            ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: 'var(--gray-500)' }}>{label}</span>
                    <span style={{ fontWeight: 700 }}>{val || '—'}</span>
                </div>
            ))}
            <div style={{ marginTop: 8, padding: '12px 16px', background: 'rgba(245,158,11,0.08)', borderRadius: 10, fontSize: 12, color: '#92400e', lineHeight: 1.7 }}>
                ⚠ Your application will be reviewed by the SellerConnect team. Approval typically takes <strong>24–48 hours</strong>. You'll receive an SMS upon approval.
            </div>
        </div>
    ];

    if (submitted) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #064e3b, #065f46)' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: 40, maxWidth: 420, width: '90%', textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: 64 }}>🛵</div>
                <h2 style={{ marginTop: 16, fontSize: 22, fontWeight: 800 }}>Application Submitted!</h2>
                <p style={{ opacity: 0.8, fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
                    Your rider registration is under review. Our team will verify your documents and send an SMS to <strong>{form.phone}</strong> within 24–48 hours.
                </p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                    Back to Home
                </Link>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #064e3b, #10b981)', padding: '24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Truck size={22} color="#fff" />
                    </div>
                    <div style={{ color: '#fff' }}>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>Become a Rider</div>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>SellerConnect Delivery Partner</div>
                    </div>
                </div>

                {/* Step indicators */}
                <div style={{ display: 'flex', padding: '0 24px', borderBottom: '1px solid #f3f4f6' }}>
                    {steps.map((s, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center', padding: '14px 0', borderBottom: `2px solid ${i === step ? '#10b981' : 'transparent'}` }}>
                            <div style={{ fontSize: 11, fontWeight: i === step ? 700 : 500, color: i === step ? '#10b981' : i < step ? '#059669' : '#9ca3af' }}>
                                {i < step ? '✓ ' : ''}{s}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--gray-900)' }}>
                        {steps[step]}
                    </h3>
                    {STEP_CONTENT[step]}
                </div>

                {/* Navigation */}
                <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    {step > 0 ? (
                        <button onClick={() => setStep(s => s - 1)}
                            className="btn btn-outline"
                            style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ArrowLeft size={14} /> Back
                        </button>
                    ) : (
                        <Link to="/" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ArrowLeft size={14} /> Cancel
                        </Link>
                    )}
                    {step < steps.length - 1 ? (
                        <button onClick={() => setStep(s => s + 1)}
                            className="btn btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            Next <ChevronRight size={14} />
                        </button>
                    ) : (
                        <button onClick={() => setSubmitted(true)}
                            className="btn btn-primary"
                            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            🚀 Submit Application
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
