'use client';
export default function Home() {
  // This is a simple redirect — the real app is in ClientApp
  if (typeof window !== 'undefined') {
    window.location.href = '/app';
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>⚡ QuickGig</h1>
        <p style={{ color: '#64748B', marginTop: 8 }}>Loading...</p>
      </div>
    </div>
  );
}
