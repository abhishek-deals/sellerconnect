import './Dashboard.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const revenues = [42000, 58000, 51000, 73000, 68000, 92000, 85000];
const maxRev = Math.max(...revenues);

export default function Analytics() {
    return (
        <div>
            <div className="db-page-header">
                <div><h1>Analytics</h1><p>Track your sales performance, conversion rates, and growth trends.</p></div>
                <select className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                    <option>Last 7 months</option><option>Last 30 days</option><option>This year</option>
                </select>
            </div>

            <div className="db-stat-grid" style={{ marginBottom: '24px' }}>
                {[
                    { label: 'Monthly Revenue', value: '₹92,000', trend: '↑ 35% vs last month' },
                    { label: 'Conversion Rate', value: '4.8%', trend: '↑ 0.6%' },
                    { label: 'Avg. Order Value', value: '₹840', trend: '↑ ₹120' },
                    { label: 'Repeat Customer Rate', value: '65%', trend: '↑ 8%' },
                ].map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div className="db-stat-value" style={{ fontSize: '24px' }}>{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                        <div className="stat-trend trend-up" style={{ marginTop: 4 }}>{s.trend}</div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '24px' }}>Monthly Revenue (₹)</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', paddingBottom: '32px', position: 'relative' }}>
                    {revenues.map((r, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                            <div style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: 600 }}>₹{Math.round(r / 1000)}K</div>
                            <div style={{ width: '100%', borderRadius: '8px 8px 0 0', background: 'var(--gradient)', height: `${(r / maxRev) * 100}%`, minHeight: '4px', transition: 'height 0.5s ease', cursor: 'pointer' }}
                                title={`₹${r.toLocaleString('en-IN')}`}></div>
                            <div style={{ fontSize: '12px', color: 'var(--gray-400)', fontWeight: 600 }}>{months[i]}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="db-two-col">
                {/* Best Products */}
                <div className="card">
                    <h3 style={{ marginBottom: '18px' }}>Best Performing Products</h3>
                    {[['🌾 Basmati Rice 5kg', '₹17,040', 82],
                    ['🫙 Fortune Oil 1L', '₹12,250', 60],
                    ['🧈 Amul Butter 500g', '₹5,940', 33],
                    ['🪥 Colgate 200g', '₹4,120', 24]].map(([name, revenue, pct], i) => (
                        <div key={i} style={{ marginBottom: '14px' }}>
                            <div className="flex-between" style={{ marginBottom: '6px' }}>
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
                                <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{revenue}</span>
                            </div>
                            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${pct}%` }}></div></div>
                        </div>
                    ))}
                </div>

                {/* Traffic Sources */}
                <div className="card">
                    <h3 style={{ marginBottom: '18px' }}>Order Sources</h3>
                    {[['WhatsApp', 45, 'purple'], ['Website', 30, 'blue'], ['Google', 15, 'green'], ['Direct', 10, 'orange']].map(([src, pct, col], i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <div className="flex-between" style={{ marginBottom: '6px' }}>
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{src}</span>
                                <span className={`badge badge-${col}`} style={{ padding: '2px 8px', fontSize: '11px' }}>{pct}%</span>
                            </div>
                            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${pct}%` }}></div></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
